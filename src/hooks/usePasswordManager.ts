"use client";

import { useState, useEffect } from "react";
import { PasswordEntry, Group } from "@/types/password";
import { createClient } from "@/lib/supabase";

export const usePasswordManager = (userId: string | null) => {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  // Load data from Supabase
  useEffect(() => {
    if (!userId) {
      setPasswords([]);
      setGroups([]);
      setLoading(false);
      return;
    }

    loadData();
  }, [userId]);

  const loadData = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      console.log("Loading data for user:", userId);

      // Load groups
      const { data: groupsData, error: groupsError } = await supabase.
      from("groups").
      select("*").
      eq("user_id", userId).
      order("created_at", { ascending: true });

      if (groupsError) {
        console.error("Error loading groups:", groupsError);
        throw groupsError;
      }

      console.log("Loaded groups:", groupsData);

      const mappedGroups: Group[] = groupsData.map((g) => ({
        id: g.id,
        name: g.name,
        color: g.color,
        icon: g.icon || undefined
      }));

      setGroups(mappedGroups);

      // Load passwords
      const { data: passwordsData, error: passwordsError } = await supabase.
      from("passwords").
      select("*").
      eq("user_id", userId).
      order("created_at", { ascending: false });

      if (passwordsError) {
        console.error("Error loading passwords:", passwordsError);
        throw passwordsError;
      }

      console.log("Loaded passwords:", passwordsData);

      const mappedPasswords: PasswordEntry[] = passwordsData.map((p) => ({
        id: p.id,
        serviceName: p.service_name,
        login: p.login,
        password: p.password,
        groupId: p.group_id,
        createdAt: new Date(p.created_at),
        updatedAt: new Date(p.updated_at)
      }));

      setPasswords(mappedPasswords);
    } catch (error) {
      console.error("Error loading data:", error);
      alert("Ошибка загрузки данных. Проверьте консоль.");
    } finally {
      setLoading(false);
    }
  };

  const addPassword = async (
  entry: Omit<PasswordEntry, "id" | "createdAt" | "updatedAt">) =>
  {
    if (!userId) return;

    try {
      console.log("Adding password:", entry);

      const { data, error } = await supabase.
      from("passwords").
      insert({
        user_id: userId,
        service_name: entry.serviceName,
        login: entry.login,
        password: entry.password,
        group_id: entry.groupId
      }).
      select().
      single();

      if (error) {
        console.error("Error adding password:", error);
        alert(`Ошибка добавления пароля: ${error.message}`);
        throw error;
      }

      console.log("Password added:", data);

      const newEntry: PasswordEntry = {
        id: data.id,
        serviceName: data.service_name,
        login: data.login,
        password: data.password,
        groupId: data.group_id,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      };

      setPasswords([newEntry, ...passwords]);
    } catch (error) {
      console.error("Error adding password:", error);
    }
  };

  const updatePassword = async (
  id: string,
  updates: Partial<PasswordEntry>) =>
  {
    if (!userId) return;

    try {
      const updateData: any = {
        updated_at: new Date().toISOString()
      };

      if (updates.serviceName !== undefined)
      updateData.service_name = updates.serviceName;
      if (updates.login !== undefined) updateData.login = updates.login;
      if (updates.password !== undefined)
      updateData.password = updates.password;
      if (updates.groupId !== undefined) updateData.group_id = updates.groupId;

      const { error } = await supabase.
      from("passwords").
      update(updateData).
      eq("id", id).
      eq("user_id", userId);

      if (error) {
        console.error("Error updating password:", error);
        alert(`Ошибка обновления пароля: ${error.message}`);
        throw error;
      }

      setPasswords(
        passwords.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
        )
      );
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const deletePassword = async (id: string) => {
    if (!userId) return;

    try {
      const { error } = await supabase.
      from("passwords").
      delete().
      eq("id", id).
      eq("user_id", userId);

      if (error) {
        console.error("Error deleting password:", error);
        alert(`Ошибка удаления пароля: ${error.message}`);
        throw error;
      }

      setPasswords(passwords.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting password:", error);
    }
  };

  const addGroup = async (group: Omit<Group, "id">) => {
    if (!userId) return null;

    try {
      console.log("Adding group:", group);

      const { data, error } = await supabase.
      from("groups").
      insert({
        user_id: userId,
        name: group.name,
        color: group.color,
        icon: group.icon || null
      }).
      select().
      single();

      if (error) {
        console.error("Error adding group:", error);
        alert(`Ошибка добавления группы: ${error.message}`);
        throw error;
      }

      console.log("Group added:", data);

      const newGroup: Group = {
        id: data.id,
        name: data.name,
        color: data.color,
        icon: data.icon || undefined
      };

      setGroups([...groups, newGroup]);
      return newGroup;
    } catch (error) {
      console.error("Error adding group:", error);
      return null;
    }
  };

  const updateGroup = async (id: string, updates: Partial<Group>) => {
    if (!userId) return;

    try {
      const updateData: any = {
        updated_at: new Date().toISOString()
      };

      if (updates.name !== undefined) updateData.name = updates.name;
      if (updates.color !== undefined) updateData.color = updates.color;
      if (updates.icon !== undefined) updateData.icon = updates.icon || null;

      const { error } = await supabase.
      from("groups").
      update(updateData).
      eq("id", id).
      eq("user_id", userId);

      if (error) {
        console.error("Error updating group:", error);
        alert(`Ошибка обновления группы: ${error.message}`);
        throw error;
      }

      setGroups(groups.map((g) => g.id === id ? { ...g, ...updates } : g));
    } catch (error) {
      console.error("Error updating group:", error);
    }
  };

  const deleteGroup = async (id: string) => {
    if (!userId) return;

    try {
      const { error } = await supabase.
      from("groups").
      delete().
      eq("id", id).
      eq("user_id", userId);

      if (error) {
        console.error("Error deleting group:", error);
        alert(`Ошибка удаления группы: ${error.message}`);
        throw error;
      }

      setGroups(groups.filter((g) => g.id !== id));
      setPasswords(
        passwords.map((p) => p.groupId === id ? { ...p, groupId: null } : p)
      );
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  const getFilteredPasswords = () => {
    if (selectedGroupId === null) {
      return passwords;
    }
    return passwords.filter((p) => p.groupId === selectedGroupId);
  };

  return {
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
    loading
  };
};