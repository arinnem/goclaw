"""
PDF to Markdown Converter
=========================
Converts PDF files to well-formatted Markdown documents,
preserving headings, tables, lists, inline formatting, and structure.

Uses pymupdf4llm (built on PyMuPDF) for high-fidelity extraction.

Usage:
    python pdf2md.py <input.pdf> [output.md]
    python pdf2md.py <input.pdf> --page-chunks   # Split by pages
    python pdf2md.py <input.pdf> --pages 0-5      # Specific page range

Requirements:
    pip install pymupdf4llm
"""

import argparse
import sys
import os
import re

try:
    import pymupdf4llm
except ImportError:
    print("❌ Missing dependency. Install with:")
    print("   pip install pymupdf4llm")
    sys.exit(1)


def convert_pdf_to_md(
    input_path: str,
    output_path: str = None,
    pages: list = None,
    page_chunks: bool = False,
    write_images: bool = False,
) -> str:
    """Convert a PDF file to Markdown.

    Args:
        input_path: Path to the input PDF file.
        output_path: Path for the output .md file. Auto-generated if None.
        pages: List of page numbers to convert (0-indexed). None = all pages.
        page_chunks: If True, return list of per-page markdown chunks.
        write_images: If True, extract and save images alongside the .md file.

    Returns:
        The markdown content as a string.
    """
    if not os.path.isfile(input_path):
        print(f"❌ File not found: {input_path}")
        sys.exit(1)

    if output_path is None:
        base = os.path.splitext(input_path)[0]
        output_path = f"{base}.md"

    # Auto-versioning: avoid overwriting existing files
    if os.path.exists(output_path):
        base, ext = os.path.splitext(output_path)
        # Strip existing version suffix
        base_clean = re.sub(r"-v\d+$", "", base)
        version = 1
        while os.path.exists(f"{base_clean}-v{version}{ext}"):
            version += 1
        output_path = f"{base_clean}-v{version}{ext}"

    # Build kwargs for pymupdf4llm
    kwargs = {
        "show_progress": True,
    }
    if pages is not None:
        kwargs["pages"] = pages

    image_dir = None
    if write_images:
        image_dir = os.path.join(os.path.dirname(output_path), "images")
        os.makedirs(image_dir, exist_ok=True)
        kwargs["write_images"] = True
        kwargs["image_path"] = image_dir

    if page_chunks:
        chunks = pymupdf4llm.to_markdown(input_path, page_chunks=True, **kwargs)
        md_content = ""
        for i, chunk in enumerate(chunks):
            text = chunk.get("text", "") if isinstance(chunk, dict) else str(chunk)
            md_content += text
            if i < len(chunks) - 1:
                md_content += "\n\n---\n\n"
    else:
        md_content = pymupdf4llm.to_markdown(input_path, **kwargs)

    # Post-processing: clean up common artifacts
    md_content = _post_process(md_content)

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(md_content)

    print(f"✅ Converted: {output_path}")
    if image_dir and os.listdir(image_dir):
        print(f"📁 Images saved to: {image_dir}")

    return md_content


def _post_process(md: str) -> str:
    """Clean up common PDF extraction artifacts."""
    # Remove excessive blank lines (3+ → 2)
    md = re.sub(r"\n{4,}", "\n\n\n", md)

    # Remove trailing whitespace on each line
    md = "\n".join(line.rstrip() for line in md.split("\n"))

    # Ensure file ends with single newline
    md = md.strip() + "\n"

    return md


def _parse_page_range(page_str: str) -> list:
    """Parse page range string like '0-5' or '1,3,5' into a list of ints."""
    pages = []
    for part in page_str.split(","):
        part = part.strip()
        if "-" in part:
            start, end = part.split("-", 1)
            pages.extend(range(int(start), int(end) + 1))
        else:
            pages.append(int(part))
    return pages


def main():
    parser = argparse.ArgumentParser(
        description="Convert PDF to Markdown preserving tables, headings, and structure.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python pdf2md.py report.pdf
  python pdf2md.py report.pdf output.md
  python pdf2md.py report.pdf --pages 0-5
  python pdf2md.py report.pdf --page-chunks --images
        """,
    )
    parser.add_argument("input", help="Path to the input PDF file")
    parser.add_argument("output", nargs="?", default=None, help="Path for output .md file (auto-generated if omitted)")
    parser.add_argument("--pages", type=str, default=None, help="Page range to convert, e.g. '0-5' or '1,3,7' (0-indexed)")
    parser.add_argument("--page-chunks", action="store_true", help="Insert page separators (---) between pages")
    parser.add_argument("--images", action="store_true", help="Extract and save images alongside the .md file")

    args = parser.parse_args()

    pages = _parse_page_range(args.pages) if args.pages else None

    convert_pdf_to_md(
        input_path=args.input,
        output_path=args.output,
        pages=pages,
        page_chunks=args.page_chunks,
        write_images=args.images,
    )


if __name__ == "__main__":
    main()
