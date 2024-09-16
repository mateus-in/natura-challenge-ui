import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import cookies from 'js-cookie'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAppContext } from '../hooks'
import { getAuthenticatedUser, signIn } from '../services'

const signInSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string(),
})

type SignInFormProps = z.infer<typeof signInSchema>

export function SignIn() {
  const { signInIsVisible, setSignInIsVisible, setSignUpIsVisible, setUser } =
    useAppContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormProps>({
    resolver: zodResolver(signInSchema),
  })

  function handleCloseSignIn() {
    setSignInIsVisible(false)
  }

  function handleOpenSignUp() {
    setSignInIsVisible(false)
    setSignUpIsVisible(true)
  }

  async function onSignIn(data: SignInFormProps) {
    const { token } = await signIn({
      email: data.email,
      password: data.password,
    })

    cookies.set('NaturaChallenge:Token', token)

    const user = await getAuthenticatedUser(token)

    setUser(user)

    setSignInIsVisible(false)
  }

  return (
    <Dialog
      className="relative z-10"
      onClose={handleCloseSignIn}
      open={signInIsVisible}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            transition
          >
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Entrar
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit(onSignIn)}>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    E-mail
                  </label>
                  <div className="mt-2">
                    <input
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      id="email"
                      type="email"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-red-500 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Senha
                  </label>
                  <div className="mt-2">
                    <input
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      id="password"
                      type="password"
                      {...register('password')}
                    />
                    {errors.password && (
                      <p className="text-red-500 mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type="submit"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Não tem uma conta?{' '}
                <span
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
                  onClick={handleOpenSignUp}
                >
                  Criar conta
                </span>
              </p>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
