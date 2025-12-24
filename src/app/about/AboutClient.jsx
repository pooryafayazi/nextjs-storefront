'use client'

// import styled from '@emotion/styled'
import { jsx, css } from '@emotion/react'
import { useTheme } from '@emotion/react'

// const Box = styled.div(({ theme }) => ({
//   fontSize: theme.fontSizes.sm,
//   color: theme.colors.accent,
//   padding: theme.space[3],
//   borderRadius: theme.radii.md,
// }))

// export default function AboutClient() {
// return <Box>This is the about page (themed).</Box>;
// }

export default function AboutClient() {
  const theme = useTheme()
  return (
    <div
      css={css`
        font-size: ${theme.fontSizes.lg};
        color: ${theme.colors.accent};
        padding: ${theme.space[3]};
        border-radius: ${theme.radii.md};
      `}
    >
      This is the about page (themed).
    </div>
  )
}
