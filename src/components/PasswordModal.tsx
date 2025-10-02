"use client";

import { useState, useEffect } from "react";
import { PasswordEntry, Group } from "@/types/password";
import { GlassCard } from "./GlassCard";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
  entry: Omit<PasswordEntry, "id" | "createdAt" | "updatedAt">)
  => void;
  groups: Group[];
  editEntry?: PasswordEntry | null;
}

export const PasswordModal = ({
  isOpen,
  onClose,
  onSave,
  groups,
  editEntry
}: PasswordModalProps) => {
  const [serviceName, setServiceName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [groupId, setGroupId] = useState<string | null>(null);

  useEffect(() => {
    if (editEntry) {
      setServiceName(editEntry.serviceName);
      setLogin(editEntry.login);
      setPassword(editEntry.password);
      setGroupId(editEntry.groupId);
    } else {
      setServiceName("");
      setLogin("");
      setPassword("");
      setGroupId(null);
    }
  }, [editEntry, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName || !login || !password) return;

    onSave({
      serviceName,
      login,
      password,
      groupId
    });

    setServiceName("");
    setLogin("");
    setPassword("");
    setGroupId(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      data-oid="18qfv9i">

      <GlassCard
        className="w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
        data-oid="b8vso16">

        <div
          className="flex items-center justify-between mb-6"
          data-oid="wpt7ccj">

          <h2 className="text-2xl font-semibold text-white" data-oid="9xo8ehk">
            {editEntry ? "Редактировать" : "Добавить пароль"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-secondary/20 hover:bg-secondary/30 text-secondary transition-colors"
            data-oid="dzo-soa">

            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              data-oid="qm-n5f.">

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
                data-oid="pey6k6g" />

            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" data-oid="rv8knxg">
          <div data-oid="-y:s9iz">
            <label
              className="block text-sm font-medium text-secondary mb-2"
              data-oid="dlh0_mj">

              Название сервиса *
            </label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full px-4 py-2 bg-dark-bg/60 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-white placeholder-secondary/50"
              placeholder="Например, Instagram"
              required
              data-oid="eq:2pe_" />

          </div>

          <div data-oid="43ncfdp">
            <label
              className="block text-sm font-medium text-secondary mb-2"
              data-oid="gzmfb3o">

              Логин *
            </label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full px-4 py-2 bg-dark-bg/60 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-white placeholder-secondary/50"
              placeholder="username@example.com"
              required
              data-oid="7o9oper" />

          </div>

          <div data-oid="w0xexp-">
            <label
              className="block text-sm font-medium text-secondary mb-2"
              data-oid="b.r8dq2">

              Пароль *
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-dark-bg/60 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-white placeholder-secondary/50"
              placeholder="••••••••"
              required
              data-oid="dhn30xv" />

          </div>

          <div data-oid="daa5ps0">
            <label
              className="block text-sm font-medium text-secondary mb-2"
              data-oid="ed4c7sv">

              Группа
            </label>
            <select
              value={groupId || ""}
              onChange={(e) => setGroupId(e.target.value || null)}
              className="w-full px-4 py-2 bg-dark-bg/60 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-white"
              data-oid="-_y11b9">

              <option value="" data-oid="2r.4qxg">
                Без группы
              </option>
              {groups.map((group) =>
              <option key={group.id} value={group.id} data-oid="u:bqcj-">
                  {group.name}
                </option>
              )}
            </select>
          </div>

          <div className="flex gap-3 pt-4" data-oid="fr.9gzi">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-secondary/20 hover:bg-secondary/30 rounded-lg text-white font-medium transition-colors"
              data-oid="_a_v8ac">

              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 from-primary to-accent hover:from-primary/90 hover:to-accent/90 rounded-lg text-white font-medium transition-colors bg-accent"
              data-oid="7n5ixj7">

              {editEntry ? "Сохранить" : "Добавить"}
            </button>
          </div>
        </form>
      </GlassCard>
    </div>);

};