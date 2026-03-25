using namespace System.Security.Cryptography.X509Certificates
using namespace System.Net
using namespace System.Net.Security

$hostName = "api.telegram.org"
$tcpClient = New-Object System.Net.Sockets.TcpClient($hostName, 443)
$sslStream = New-Object System.Net.Security.SslStream($tcpClient.GetStream(), $false, { param($sender, $cert, $chain, $errors) return $true })
$sslStream.AuthenticateAsClient($hostName)

$serverCert = New-Object X509Certificate2($sslStream.RemoteCertificate)
$chain = New-Object X509Chain
$chain.Build($serverCert) | Out-Null

foreach ($element in $chain.ChainElements) {
    $cert = $element.Certificate
    $bytes = $cert.Export([X509ContentType]::Cert)
    $base64 = [Convert]::ToBase64String($bytes, [Base64FormattingOptions]::InsertLineBreaks)
    
    Add-Content proxy_ca.crt "-----BEGIN CERTIFICATE-----"
    Add-Content proxy_ca.crt $base64
    Add-Content proxy_ca.crt "-----END CERTIFICATE-----"
}

$tcpClient.Close()
