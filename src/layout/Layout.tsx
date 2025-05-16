import { ReactNode, useEffect } from 'react'
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "components/store/hooks/hooks";
import { getUser } from "components/store/slices/user.slice";
import { usePageLoading } from "components/hooks/usePageLoading";
import LoadingBar from "components/components/UploadVideo/LoadingBar";
import { SessionType } from "components/types/user.types";
import { useRouter } from "next/router";
import { pagesWithoutLayout, protectedPages } from "components/constants/pages";
import dynamic from "next/dynamic";

const OptionsInterface = dynamic(
  () => import('components/components/Option/Options'),
);

const OptionsMediumScreen = dynamic(
  () => import('components/components/Option/Options.medium'),
);
interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {

  const { data, status } = useSession() as SessionType;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.users.currentUser)
  const { loading, url } = usePageLoading();
  const regex = /^(\/es)?\/summary\/[^/]+$/;

  const router = useRouter()

  useEffect(() => {
    const id = data?.user.id;
    if (id && !user?.id) {
      dispatch(getUser(id))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  /* useEffect(() => {
    if(status === 'unauthenticated' && protectedPages.some(page => page === router.route)) {
      router.push('/login')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, router.route]) */

  if (pagesWithoutLayout.some(pag => pag === router.route)) return <> {children} </>

  else return (
    <div className='bg-myblack-300 text-white flex flex-col md:flex-row font-poppins'>
      {
        status !== 'unauthenticated' && 
        <aside className="select-none lg:w-[300px]">
          <OptionsInterface />
          <OptionsMediumScreen />
        </aside>
      }
      <main className='h-[100vh] w-full py-10 sm:p-10'>
        {
          loading && regex.test(url) ? <LoadingBar message="Cargando" /> : children
        }
      </main>
    </div>
  )
}
export default Layout;