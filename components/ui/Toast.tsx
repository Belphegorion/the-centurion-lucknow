"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { Icon } from "./Icon";

export interface ToastMessage {
  id: string;
  type?: "success" | "error" | "info";
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-24 inset-x-4 z-50 max-w-md mx-auto pointer-events-auto"
        >
          <div className="flex items-center justify-between gap-3 px-5 py-3.5 bg-charcoal/95 border border-gold/40 text-ivory rounded-card shadow-card backdrop-blur-md">
            <div className="flex items-center gap-3">
              {toast.type === "success" && (
                <Icon name="CheckCircle2" size={18} className="text-status-success shrink-0" />
              )}
              {toast.type === "error" && (
                <Icon name="AlertCircle" size={18} className="text-status-error shrink-0" />
              )}
              {(!toast.type || toast.type === "info") && (
                <Icon name="Info" size={18} className="text-gold shrink-0" />
              )}
              <p className="text-sm font-medium text-ivory leading-snug">{toast.message}</p>
            </div>

            {toast.action && (
              <button
                type="button"
                onClick={toast.action.onClick}
                className="text-xs font-semibold text-gold hover:underline shrink-0 px-2 py-1"
              >
                {toast.action.label}
              </button>
            )}

            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss toast"
              className="text-smoke hover:text-ivory p-1 -mr-1"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
