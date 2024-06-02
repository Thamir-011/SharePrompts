const { Suspense } = require("react");

function UpdatePromptLayout({ children }) {
  return (
    <Suspense>
        {children}
    </Suspense>
  )
}

export default UpdatePromptLayout