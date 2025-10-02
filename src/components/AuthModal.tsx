"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { GlassCard } from "./GlassCard";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
      }

      setEmail("");
      setPassword("");
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      data-oid="hq0z7og"
    >
      <GlassCard className="w-full max-w-md p-6" data-oid="w9g_zpu">
        <div
          className="flex items-center justify-between mb-6"
          data-oid="s:ickt4"
        >
          <h2 className="text-2xl font-semibold text-white" data-oid="3kczv0p">
            {isLogin ? "Вход" : "Регистрация"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-secondary/20 hover:bg-secondary/30 text-secondary transition-colors"
            data-oid="x6p.qrt"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              data-oid="xfg7mzj"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
                data-oid="lafxs9b"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" data-oid="2-qac3.">
          {error && (
            <div
              className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm"
              data-oid="yubpz2v"
            >
              {error}
            </div>
          )}

          <div data-oid="5ooilvc">
            <label
              className="block text-sm font-medium text-secondary mb-2"
              data-oid="jx2y79u"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-dark-bg/60 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-white placeholder-secondary/50"
              placeholder="your@email.com"
              required
              data-oid="be5au8y"
            />
          </div>

          <div data-oid="nztesho">
            <label
              className="block text-sm  text-secondary mb-2"
              data-oid="gj2fkoq"
            >
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-dark-bg/60 border border-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-white placeholder-secondary/50"
              placeholder="••••••••"
              required
              minLength={6}
              data-oid="rgelqu8"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-[#b9e919] hover:bg-[#8FA446] text-[#3A3A3A] rounded-lg   transition-colors disabled:opacity-50"
            data-oid="-oagz_e"
          >
            {loading ? "Загрузка..." : isLogin ? "Войти" : "Зарегистрироваться"}
          </button>

          <div className="text-center" data-oid=":vyi3ic">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="text-secondary hover:text-white transition-colors text-sm"
              data-oid="lmo6zon"
            >
              {isLogin
                ? "Нет аккаунта? Зарегистрируйтесь"
                : "Уже есть аккаунт? Войдите"}
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};
