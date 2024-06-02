const { Suspense } = require("react");

function ProfileLayout({ children }) {
  return (
    <Suspense>
        {children}
    </Suspense>
  )
}

export default ProfileLayout