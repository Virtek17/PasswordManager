"use client";

import { useState, useEffect } from "react";
import { usePasswordManager } from "@/hooks/usePasswordManager";
import { PasswordCard } from "@/components/PasswordCard";
import { PasswordModal } from "@/components/PasswordModal";
import { GroupModal } from "@/components/GroupModal";
import { GroupList } from "@/components/GroupList";
import { GlassCard } from "@/components/GlassCard";
import { AuthModal } from "@/components/AuthModal";
import { PasswordEntry, Group } from "@/types/password";
import { createClient } from "@/lib/supabase";

export default function Page() {
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const supabase = createClient();

  const {
    passwords,
    groups,
    selectedGroupId,
    setSelectedGroupId,
    addPassword,
    updatePassword,
    deletePassword,
    addGroup,
    updateGroup,
    deleteGroup,
    getFilteredPasswords,
    loading,
  } = usePasswordManager(user?.id || null);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [editingPassword, setEditingPassword] = useState<PasswordEntry | null>(
    null
  );
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Check auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        setIsAuthModalOpen(true);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        setIsAuthModalOpen(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsAuthModalOpen(true);
  };

  const filteredPasswords = getFilteredPasswords().filter(
    (p) =>
      p.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.login.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const passwordCounts = passwords.reduce(
    (acc, p) => {
      const key = p.groupId || "null";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const handleEditPassword = (entry: PasswordEntry) => {
    setEditingPassword(entry);
    setIsPasswordModalOpen(true);
  };

  const handleSavePassword = (
    entry: Omit<PasswordEntry, "id" | "createdAt" | "updatedAt">
  ) => {
    if (editingPassword) {
      updatePassword(editingPassword.id, entry);
      setEditingPassword(null);
    } else {
      addPassword(entry);
    }
  };

  const handleEditGroup = (group: Group) => {
    setEditingGroup(group);
    setIsGroupModalOpen(true);
  };

  const handleSaveGroup = (group: Omit<Group, "id">) => {
    if (editingGroup) {
      updateGroup(editingGroup.id, group);
      setEditingGroup(null);
    } else {
      addGroup(group);
    }
  };

  const selectedGroup = groups.find((g) => g.id === selectedGroupId);
  const displayTitle = selectedGroup ? selectedGroup.name : "Все пароли";

  if (!user) {
    return (
      <>
        <div
          className="w-full min-h-screen bg-(--background) flex items-center justify-center p-4"
          data-oid="bt5uj:5"
        >
          <GlassCard className="p-12 text-center max-w-md" data-oid="eqxzmxl">
            <div className="text-6xl mb-4" data-oid="9_39a:7">
              🔐
            </div>
            <h1
              className="text-2xl font-bold text-white mb-2 "
              data-oid="z7dk8n0"
            >
              Менеджер паролей
            </h1>
            <p className="text-secondary mb-6" data-oid="m8:q285">
              Войдите или зарегистрируйтесь для начала работы
            </p>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
              data-oid=".s182z0"
            >
              Войти / Регистрация
            </button>
          </GlassCard>
        </div>
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={() => setIsAuthModalOpen(false)}
          data-oid="fb-oq7v"
        />
      </>
    );
  }

  return (
    <div className="w-full min-h-screen bg-(--background)" data-oid="gbpkm4t">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8" data-oid=":57ql4.">
        {/* Header */}
        <div
          className="mb-8 flex items-center justify-between"
          data-oid="9_mntti"
        >
          <div data-oid="n3ahydp">
            <h1
              className="text-3xl md:text-4xl text-white mb-2 "
              data-oid="kmgwf5d"
            >
              🔐{" "}
              <span className="[text-shadow:0_0px_20px_#7E52FF] ">
                Менеджер паролей
              </span>
            </h1>
            <p className="text-secondary" data-oid="dtt73me">
              Храните ваши пароли в безопасности
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-secondary/20 hover:bg-secondary/30 rounded-lg text-white transition-colors flex items-center gap-2"
            data-oid="u5i0c.e"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              data-oid="o1j-x2u"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                data-oid="_nmex.7"
              />
            </svg>
            Выйти
          </button>
        </div>

        {loading ? (
          <div
            className="flex items-center justify-center py-12"
            data-oid="__--95q"
          >
            <div className="flex flex-row gap-2">
              <div className="w-4 h-4 rounded-full bg-[#b9e919] animate-bounce [animation-delay:.7s]"></div>
              <div className="w-4 h-4 rounded-full bg-[#b9e919] animate-bounce [animation-delay:.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-[#b9e919] animate-bounce [animation-delay:.7s]"></div>
            </div>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 lg:grid-cols-4 gap-6"
            data-oid="tyslk6o"
          >
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4" data-oid="2p721qo">
              <GlassCard className="p-4" data-oid="vlo62hv">
                <button
                  onClick={() => {
                    setEditingGroup(null);
                    setIsGroupModalOpen(true);
                  }}
                  className="w-full py-3 bg-[#b9e919] hover:bg-[#8FA446] text-[#3A3A3A] rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
                  data-oid="2mb.-9f"
                >
                  + Создать группу
                </button>
              </GlassCard>

              <GroupList
                groups={groups}
                selectedGroupId={selectedGroupId}
                onSelectGroup={setSelectedGroupId}
                onEditGroup={handleEditGroup}
                onDeleteGroup={deleteGroup}
                passwordCounts={passwordCounts}
                data-oid="rmv1:sh"
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-4" data-oid="txw3dqh">
              {/* Search and Add */}
              <GlassCard className="p-4" data-oid=":ls74i0">
                <div
                  className="flex flex-col sm:flex-row gap-3"
                  data-oid="ilu_mwn"
                >
                  <div className="flex-1 relative" data-oid="a_sqp6k">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Поиск по названию или логину..."
                      className="w-full pl-10 pr-4 py-3 bg-dark-bg/60 border border-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-white placeholder-secondary/50"
                      data-oid="vr::cnv"
                    />

                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      data-oid="yxs5bhp"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        data-oid=".s9lb0s"
                      />
                    </svg>
                  </div>
                  <button
                    onClick={() => {
                      setEditingPassword(null);
                      setIsPasswordModalOpen(true);
                    }}
                    className="px-6 py-3 bg-[#b9e919] hover:bg-[#8FA446] text-[#3A3A3A] rounded-xl font-medium transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
                    data-oid="b.vxxwx"
                  >
                    + Добавить пароль
                  </button>
                </div>
              </GlassCard>

              {/* Title */}
              <div className="flex items-center gap-3" data-oid="a-wfd-1">
                <h2
                  className="text-2xl font-bold text-white"
                  data-oid="4vsmxcz"
                >
                  {displayTitle}
                </h2>
                <span
                  className="px-3 py-1 bg-card-bg/60 backdrop-blur-xl rounded-full text-sm font-medium text-secondary"
                  data-oid="vovtxjp"
                >
                  {filteredPasswords.length}
                </span>
              </div>

              {/* Password List */}
              {filteredPasswords.length === 0 ? (
                <GlassCard className="p-12 text-center" data-oid="bk3pcvq">
                  <div className="text-6xl mb-4" data-oid="rpeg:6o">
                    🔒
                  </div>
                  <h3
                    className="text-xl font-semibold text-white mb-2"
                    data-oid="9oneq-j"
                  >
                    {searchQuery ? "Ничего не найдено" : "Пока нет паролей"}
                  </h3>
                  <p className="text-secondary" data-oid="3fcy44e">
                    {searchQuery
                      ? "Попробуйте изменить поисковый запрос"
                      : "Добавьте свой первый пароль для начала работы"}
                  </p>
                </GlassCard>
              ) : (
                <div className="space-y-4" data-oid="irezn2v">
                  {filteredPasswords.map((entry) => (
                    <PasswordCard
                      key={entry.id}
                      entry={entry}
                      groups={groups}
                      onEdit={handleEditPassword}
                      onDelete={(id) => {
                        if (confirm("Удалить этот пароль?")) {
                          deletePassword(id);
                        }
                      }}
                      data-oid="rk0n-qa"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          setIsPasswordModalOpen(false);
          setEditingPassword(null);
        }}
        onSave={handleSavePassword}
        groups={groups}
        editEntry={editingPassword}
        data-oid=":4_mt3_"
      />

      <GroupModal
        isOpen={isGroupModalOpen}
        onClose={() => {
          setIsGroupModalOpen(false);
          setEditingGroup(null);
        }}
        onSave={handleSaveGroup}
        editGroup={editingGroup}
        data-oid="ozca6yr"
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => setIsAuthModalOpen(false)}
        data-oid="-cuj71t"
      />
    </div>
  );
}
