"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function ReviewForm() {
  const { register, handleSubmit, reset, formState } = useForm<Record<string, string>>();
  async function onSubmit(data: Record<string, string>) {
    const res = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (!res.ok) return toast.error("Please check your review.");
    toast.success("Review submitted for approval.");
    reset();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <Input placeholder="Name" {...register("name", { required: true })} />
      <Select {...register("rating", { required: true })}>{[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} Stars</option>)}</Select>
      <Textarea placeholder="Review" {...register("review", { required: true })} />
      <Button disabled={formState.isSubmitting}>Submit Review</Button>
    </form>
  );
}
