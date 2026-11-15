"use client";

import React from "react";
import { X, Mail, Trash2, Calendar, User, MessageSquare } from "lucide-react";
import { ContactMessage } from "@/types/portfolio";

interface MessagesModalProps {
  isOpen: boolean;
  messages: ContactMessage[];
  onClose: () => void;
  onDeleteMessage: (id: string) => void;
}

export function MessagesModal({
  isOpen,
  messages,
  onClose,
  onDeleteMessage,
}: MessagesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-navy-900 border border-navy-400 rounded-lg max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-navy-400 bg-navy-950">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-gold-500" />
            <h3 className="font-serif text-lg text-white">Inbox &amp; Messages</h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/30">
              {messages.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-muted hover:text-white rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12 text-muted">
              <Mail className="w-10 h-10 mx-auto mb-3 opacity-30 text-gold-500" />
              <p className="font-sans text-sm">No incoming messages yet.</p>
              <p className="text-xs text-muted/60 mt-1">
                When someone submits the contact form, their message will appear here and in your inbox.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-surface border border-navy-400 rounded-lg p-5 hover:border-gold-500/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-gold-500" />
                      <span className="font-sans font-semibold text-white text-sm">
                        {msg.name}
                      </span>
                    </div>
                    <a
                      href={`mailto:${msg.email}?subject=Re:%20Portfolio%20Inquiry`}
                      className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 mt-1"
                    >
                      <Mail className="w-3 h-3" />
                      <span>{msg.email}</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-muted flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(msg.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <button
                      onClick={() => onDeleteMessage(msg.id)}
                      className="p-1.5 text-muted hover:text-rose-400 transition-colors"
                      title="Delete message"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="bg-navy-950/60 rounded p-3 text-xs text-body font-sans leading-relaxed whitespace-pre-wrap border border-navy-400/50">
                  {msg.message}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-navy-400 bg-navy-950 flex items-center justify-between text-xs text-muted">
          <span>Forwarded to: anuragmishra.mail@proton.me</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-navy-700 hover:bg-navy-600 text-white rounded text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
