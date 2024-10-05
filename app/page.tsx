"use client";

import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

import { IUser } from "@/app/api/user/server/domain/models/IUser";
import { useApi } from "@/hooks/useApi";
import { useContext } from "react";
import UserState from "./context/userContext";
import { UserResponseApi } from "./types/user";

export default function Home() {
  const userContext = useContext(UserState);

  if (!userContext) {
    throw new Error("MyComponent must be used within a GlobalStateProvider");
  }

  const { onStorageUser } = userContext;

  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IUser>();

  const {
    execute: createUser,
    isLoading,
    error,
  } = useApi<UserResponseApi>({
    method: "POST",
    url: "user",
  });

  const onSubmit = async (data: IUser) => {
    const response = await createUser(data);

    if (!error) router.push("/products");
    if (response.data) onStorageUser(response.data);
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="font-bold bg-white md:w-1/2 lg:w-1/3 w-full mx-5 md:m-0 flex justify-center rounded-lg p-5 flex-col gap-3 shadow-xl">
        <h2 className="font-bold text-xl text-center">
          Fill the form to register you
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <input
            {...register("name", { required: "Please put your name" })}
            className={twMerge(
              !!errors?.name ? "" : "",
              "bg-gray-200 w-full rounded-lg h-[40px] pl-5"
            )}
            placeholder="Full Name"
          />
          <button
            className={twMerge(
              isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500",
              "rounded-lg text-white px-3 py-1.5 w-full"
            )}
            disabled={isLoading}
          >
            Create User
          </button>
          {!!errors?.name && <span>{errors?.name?.message}</span>}
        </form>
      </div>
    </div>
  );
}
