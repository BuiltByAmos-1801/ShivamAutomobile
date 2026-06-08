"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const fields = [
  ["customerName", "Customer Name", true],
  ["mobileNumber", "Mobile Number", true],
  ["whatsappNumber", "WhatsApp Number", false],
  ["vehicleName", "Vehicle Name", true],
  ["vehicleModel", "Vehicle Model", true],
  ["chassisNumber", "Chassis Number", false],
  ["partName", "Service Requirement", true],
  ["partNumber", "Reference Number", false]
] as const;

export function EnquiryForm() {
  const { register, handleSubmit, reset, formState } = useForm<Record<string, string>>();
  async function onSubmit(data: Record<string, string>) {
    const res = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (!res.ok) return toast.error("Please check the enquiry details.");
    toast.success("Enquiry sent. Our team will contact you shortly.");
    reset();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
      {fields.map(([field, label, required]) => <Input key={field} placeholder={label} {...register(field, { required })} />)}
      <Textarea className="md:col-span-2" placeholder="Notes" {...register("notes")} />
      <Button disabled={formState.isSubmitting} className="md:col-span-2">Send Enquiry</Button>
    </form>
  );
}
