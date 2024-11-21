<script setup>
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import SignIn from "../components/Sign-In.vue"
import SignUp from "../components/Sign-Up.vue"

</script>

<template>
  <div class="flex justify-center">
    <Tabs default-value="sign-up" class="w-[400px]">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="sign-up">
          Sign Up
        </TabsTrigger>
        <TabsTrigger value="sign-in">
          Sign In
        </TabsTrigger>
      </TabsList>
      <TabsContent value="sign-up">
        <SignUp />
      </TabsContent>
      <TabsContent value="sign-in">
        <SignIn />
      </TabsContent>
    </Tabs>

  </div>
</template>
