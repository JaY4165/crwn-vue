<script setup>
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>

  <Card>
    <CardHeader>
      <CardTitle>Sign Up</CardTitle>
      <CardDescription>
        Please fill out the form below to create an account.
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-2">
      <div class="space-y-1">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
      <div class="space-y-1">
        <Label for="password">Password</Label>
        <Input id="password" placeholder="Enter your password" type="password" />
      </div>
      <div class="space-y-1">
        <Label for="confirm-password">Confirm Password</Label>
        <Input id="confirm-password" placeholder="Enter confirm password" type="password" />
      </div>
    </CardContent>
    <CardFooter>
      <Button class="w-full" variant="default">Save changes</Button>
    </CardFooter>
  </Card>


</template>
