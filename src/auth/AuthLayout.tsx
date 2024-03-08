import { Outlet, Navigate } from "react-router-dom"

const AuthLayout = () => {
  const isAuth = false;
  return (
    <>
      {isAuth ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 flex-col justify-center items-center">
            <Outlet />
          </section>
          <img src="/assets/images/download.png"
            alt="logo"
            className="hidden lg:block h-screen w-1/2 object-cover bg-no-repeat" />
        </>
      )}
    </>
  )
}

export default AuthLayout