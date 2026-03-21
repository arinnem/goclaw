import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Plus, RefreshCw, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { TableSkeleton } from "@/components/shared/loading-skeleton";
import { useDeferredLoading } from "@/hooks/use-deferred-loading";
import { useMinLoading } from "@/hooks/use-min-loading";
import { useTenantDetail } from "./hooks/use-tenant-detail";
import { ROUTES } from "@/lib/constants";

const TENANT_ROLES = ["owner", "admin", "operator", "member", "viewer"] as const;

function roleTranslationKey(role: string): string {
  const map: Record<string, string> = {
    owner: "roleOwner",
    admin: "roleAdmin",
    operator: "roleOperator",
    member: "roleMember",
    viewer: "roleViewer",
  };
  return map[role] ?? role;
}

export function TenantDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation("tenants");
  const { t: tc } = useTranslation("common");

  const { tenant, tenantLoading, users, usersLoading, usersRefreshing, refreshUsers, addUser, removeUser } =
    useTenantDetail(id);

  const spinning = useMinLoading(usersRefreshing);
  const showSkeleton = useDeferredLoading(usersLoading && users.length === 0);

  const [addOpen, setAddOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("member");
  const [adding, setAdding] = useState(false);

  const [removeTarget, setRemoveTarget] = useState<string | null>(null);
  const [removing, setRemoving] = useState(false);

  const handleAdd = async () => {
    if (!userId.trim()) return;
    setAdding(true);
    try {
      await addUser(userId.trim(), role);
      setAddOpen(false);
      setUserId("");
      setRole("member");
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async () => {
    if (!removeTarget) return;
    setRemoving(true);
    try {
      await removeUser(removeTarget);
      setRemoveTarget(null);
    } finally {
      setRemoving(false);
    }
  };

  if (tenantLoading) {
    return (
      <div className="p-4 sm:p-6">
        <TableSkeleton rows={3} />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <PageHeader
        title={tenant?.name ?? t("detail")}
        description={tenant ? `${tenant.slug} · ${t(tenant.status) || tenant.status}` : ""}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate(ROUTES.TENANTS)} className="gap-1">
              <ArrowLeft className="h-3.5 w-3.5" /> {t("back")}
            </Button>
          </div>
        }
      />

      {tenant && (
        <div className="rounded-md border p-4 text-base md:text-sm space-y-1">
          <div className="flex gap-2 items-center">
            <span className="text-muted-foreground w-20">{t("slug")}:</span>
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{tenant.slug}</code>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-muted-foreground w-20">{t("status")}:</span>
            <Badge variant={tenant.status === "active" ? "default" : tenant.status === "suspended" ? "destructive" : "secondary"}>
              {t(tenant.status) || tenant.status}
            </Badge>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-muted-foreground w-20">{t("created")}:</span>
            <span>{new Date(tenant.created_at).toLocaleString()}</span>
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold">{t("userManagement")}</h2>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setAddOpen(true)} className="gap-1">
              <Plus className="h-3.5 w-3.5" /> {t("addUser")}
            </Button>
            <Button variant="outline" size="sm" onClick={refreshUsers} disabled={spinning} className="gap-1">
              <RefreshCw className={spinning ? "animate-spin h-3.5 w-3.5" : "h-3.5 w-3.5"} />
              {tc("refresh")}
            </Button>
          </div>
        </div>

        {showSkeleton ? (
          <TableSkeleton rows={4} />
        ) : users.length === 0 ? (
          <EmptyState icon={Users} title={t("noUsers")} description="" />
        ) : (
          <div className="rounded-md border overflow-x-auto">
            <table className="w-full min-w-[500px] text-base md:text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2 text-left font-medium">{t("userId")}</th>
                  <th className="px-4 py-2 text-left font-medium">{t("role")}</th>
                  <th className="px-4 py-2 text-left font-medium">{t("created")}</th>
                  <th className="px-4 py-2 text-right font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.user_id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-2 font-mono text-xs">{u.user_id}</td>
                    <td className="px-4 py-2">
                      <Badge variant="outline">{t(roleTranslationKey(u.role))}</Badge>
                    </td>
                    <td className="px-4 py-2 text-muted-foreground text-xs">
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setRemoveTarget(u.user_id)}
                      >
                        {t("removeUser")}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add User Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-sm:inset-0 max-sm:translate-x-0 max-sm:translate-y-0 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("addUserTitle")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="add-user-id">{t("userId")}</Label>
              <Input
                id="add-user-id"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="user-id"
                className="text-base md:text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t("selectRole")}</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="text-base md:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TENANT_ROLES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {t(roleTranslationKey(r))}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)} disabled={adding}>
              {tc("cancel")}
            </Button>
            <Button onClick={handleAdd} disabled={adding || !userId.trim()}>
              {t("addUser")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Remove Dialog */}
      <Dialog open={!!removeTarget} onOpenChange={(o) => { if (!o) setRemoveTarget(null); }}>
        <DialogContent className="max-sm:inset-0 max-sm:translate-x-0 max-sm:translate-y-0 sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{t("removeUser")}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground py-2">{t("confirmRemoveUser")}</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRemoveTarget(null)} disabled={removing}>
              {tc("cancel")}
            </Button>
            <Button variant="destructive" onClick={handleRemove} disabled={removing}>
              {t("removeUser")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
