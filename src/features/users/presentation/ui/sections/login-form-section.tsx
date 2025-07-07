"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { useForm } from "react-hook-form";
import { usePostLogin } from "../../hooks/use-post-login";
import { UserLoginReq } from "../../../dto/request/user-login-req";

export default function LoginFormSection() {
  const { mutate, isPending } = usePostLogin();

  const form = useForm({
    defaultValues: { email: "", password: "" },
  });

  const handleSubmit = (params: UserLoginReq) => {
    mutate(params);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="email"
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          로그인
        </Button>
      </form>
    </Form>
  );
}
