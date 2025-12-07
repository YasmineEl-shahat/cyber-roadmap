"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface CertificationModalProps {
  cert: {
    title: string;
    description: string;
    total_votes: number;
    skill_level: string;
  } | null;
  open: boolean;
  onClose: (open: boolean) => void;
}

export default function CertificationModal({
  cert,
  open,
  onClose,
}: CertificationModalProps) {
  if (!cert) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>{cert.title}</DialogTitle>
        <p className="text-sm">{cert.description}</p>
        <p className="text-xs mt-2">Votes: {cert.total_votes}</p>
        <p className="text-xs">Skill: {cert.skill_level}</p>
      </DialogContent>
    </Dialog>
  );
}
