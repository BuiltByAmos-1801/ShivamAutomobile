"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { serviceTypes } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function BookingForm() {
  const { register, handleSubmit, reset, formState } = useForm<Record<string, string>>();
  async function onSubmit(data: Record<string, string>) {
    const res = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (!res.ok) return toast.error("Please check the booking details.");
    toast.success("Service booking received.");
    reset();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
      <Input placeholder="Customer Name" {...register("customerName", { required: true })} />
      <Input placeholder="Phone Number" {...register("phoneNumber", { required: true })} />
      <Input placeholder="Vehicle Name" {...register("vehicleName", { required: true })} />
      <Input placeholder="Vehicle Number" {...register("vehicleNumber", { required: true })} />
      <Select {...register("serviceType", { required: true })}>{serviceTypes.map((type) => <option key={type}>{type}</option>)}</Select>
      <Input type="date" {...register("preferredDate", { required: true })} />
      <Input type="time" {...register("preferredTime", { required: true })} />
      <Textarea className="md:col-span-2" placeholder="Problem Description" {...register("problemDescription", { required: true })} />
      <Button disabled={formState.isSubmitting} className="md:col-span-2">Book Service</Button>
    </form>
  );
}
