import { colors, gutters, theme } from '../../styles/deleteYourData';

import { Box } from '@chakra-ui/react';
import { DeleteYourDataNavigation } from './nav';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

const StyledHero = styled.header`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  color: ${colors.white};
  background: linear-gradient(rgba(0,0,0, .8), rgba(0,0,0, .75)),
    url(/images/dyd-bg.png);
  background-size: cover;
  background-attachment: fixed;
  background-position: center;

  @media(max-height: 620px) {
    min-height: 540px;
  }

  .text-box {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    @media(max-height: 600px) {
      top: 70%;
      transform: translateY(-70%);
    }

    @media(max-width: 640px) {
      left: 5%;
      right: 5%;
    }

    @media(max-width: 540px) {
      text-align: center;
    }
  }

  p {
    max-width: 620px;
    margin: ${gutters.small} 0;
    font-size: ${theme.fontSizes.normal};

    @media (max-width: 900px) {
      max-width: 560px;
    }
  }

  span {
    @media(max-width: 613px) {
      display: none;
    }
  }
`;

export const Hero = () => {
  const [loginButtonDisabled, disableLoginButton] = useState(false);
  const { isLoading } = useUser();
  const router = useRouter();

  return (
    <StyledHero>
      <DeleteYourDataNavigation />
      <div aria-hidden={true} className="gradient"></div>
      <Box className="row" zIndex="1">
        <div className="text-box">
          <Box as="h1" color={theme.colors.white}>Delete Your Data</Box>
          <p>
            Tired of data brokers buying and selling your data? Reclaim your
            privacy with Delete Your Data. Sign Up Today or email us at
            support@neonlaw.com to learn more.
          </p>
          {isLoading ? null :
            (
              <Box
                as="button"
                display="inline-block"
                color="inherit"
                padding=".6rem 2.2rem"
                textDecoration="none"
                border="1px solid"
                fontWeight="500"
                borderRadius="10rem"
                borderColor={colors.primary}
                background={colors.primary}
                disabled={loginButtonDisabled}
                onClick={() => {
                  disableLoginButton(true);
                  router.push('/api/auth/login');
                }}
              >
                  Sign Up Today
              </Box>
            )
          }
        </div>
      </Box>
    </StyledHero>
  );
};
