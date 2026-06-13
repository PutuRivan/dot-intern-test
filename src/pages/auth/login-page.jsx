import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React from 'react'
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.username.value, e.target.password.value);
    toast.success('Login successful');
    navigate('/home');
  }
  return (
    <main className="grid place-items-center h-svh">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Field>
                <FieldLabel>Username</FieldLabel>
                <Input type="text" name="username" />
                <FieldError>Username is required</FieldError>
              </Field>
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input type="password" name="password" />
                <FieldError>Password is required</FieldError>
              </Field>
              <Button type="submit" className="w-full">Login</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
