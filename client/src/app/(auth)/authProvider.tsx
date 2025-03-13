"use client";

import React, { useEffect } from "react";
import { Amplify } from "aws-amplify";
import {
  Authenticator,
  Button,
  CheckboxField,
  Heading,
  Radio,
  RadioGroupField,
  useAuthenticator,
  useTheme,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

// https://docs.amplify.aws/gen1/javascript/tools/libraries/configure-categories/

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
            userPoolClientId:
                process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
        },
    },
});

const components = {
    Header() {
        return (
            <View className="mt-4">
                <Heading level={3} className="!text-2xl !font-bold">
                    <Image
                        src="/logo-only.png"
                        alt="Terra Haven Logo"
                        width={48}
                        height={48}
                    />
                </Heading>
            </View>
        );
    },
    SignIn: {
        Header() {
            // const { tokens } = useTheme();
      
            return (
                <div className="text-(--muted-foreground) my-2">
                    <span className="font-bold">Welcome!</span> Please sign in to continue
                </div>
            );
        },
        Footer() {
            const { toSignUp } = useAuthenticator();
            const { toForgotPassword } = useAuthenticator();

            return (
                <View className="text-center mt-4">
                    <p className="text-(--muted-foreground)">
                        Don&apos;t have an account?{" "}
                        <button
                            onClick={toSignUp}
                            className="text-(--primary) hover:underline bg-transparent border-none p-0 cursor-pointer"
                        >
                            Sign up here
                        </button>
                    </p>
                    <Button
                        onClick={toForgotPassword}
                        size="small"
                        variation="link"
                    >
                        Reset Password
                    </Button>
                </View>
            );
        },
    },
    SignUp: {
        Header() {
            // const { tokens } = useTheme();
      
            return (
                <div className="text-(--muted-foreground) my-2">
                    <span className="font-bold">Join us today!</span> Create an account to get started
                </div>
            );
        },
        FormFields() {
            const { validationErrors } = useAuthenticator();

            return (
                <>
                    <Authenticator.SignUp.FormFields />
                    <RadioGroupField
                        legend="Role"
                        name="custom:role"
                        errorMessage={validationErrors?.["custom:role"]}
                        hasError={!!validationErrors?.["custom:role"]}
                        isRequired
                    >
                        <Radio value="tenant">Tenant</Radio>
                        <Radio value="manager">Manager</Radio>
                    </RadioGroupField>

                    <CheckboxField
                        errorMessage={validationErrors.acknowledgement as string}
                        hasError={!!validationErrors.acknowledgement}
                        name="acknowledgement"
                        value="yes"
                        label="I agree with the Policy"
                    />
                </>
            );
        },

        Footer() {
            const { toSignIn } = useAuthenticator();
            return (
                <View className="text-center mt-4">
                    <p className="text-(--muted-foreground)">
                        Already have an account?{" "}
                        <button
                            onClick={toSignIn}
                            className="text-(--primary) hover:underline bg-transparent border-none p-0 cursor-pointer"
                        >
                            Sign in
                        </button>
                    </p>
                </View>
            );
        },
    },
    ConfirmSignUp: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        }
    },
    SetupTotp: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        }
    },
    ConfirmSignIn: {
        Header() {
            const { tokens } = useTheme();
            return (
                <Heading
                    padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                    level={3}
                >
                    Enter Information:
                </Heading>
            );
        }
    },
    ForgotPassword: {
        Header() {
            // const { tokens } = useTheme();
      
            return (
                <div className="text-(--muted-foreground) my-2">
                    <span className="font-bold">Forgot your password?</span> Let&apos;s reset it
                </div>
            );
        },
    },
    ConfirmResetPassword: {
        Header() {
            // const { tokens } = useTheme();
      
            return (
                <div className="text-(--muted-foreground) my-2">
                    Set a new password to regain access
                </div>
            );
        },
    },
};

const formFields = {
    signIn: {
        username: {
            placeholder: 'Enter your email',
            label: "Email",
            isRequired: true,
            autocomplete: "off",
        },
        password: {
            placeholder: "Enter your password",
            label: "Password",
            isRequired: true,
            autocomplete: "off",
        }
    },
    signUp: {
        username: {
            order: 1,
            placeholder: 'Choose a username',
            label: "Username",
            isRequired: true,
            autocomplete: "off",
        },
        email: {
            order: 2,
            placeholder: 'Enter your email',
            label: "Email",
            isRequired: true,
            autocomplete: "off",
        },
        password: {
            order: 3,
            label: 'Password',
            placeholder: 'Create a password',
            isRequired: true,
            autocomplete: "off",
        },
        confirm_password: {
            order: 4,
            label: "Confirm Password",
            placeholder: 'Confirm your password',
            isRequired: true,
            autocomplete: "off",
        },
    },
    forceNewPassword: {
        password: {
            placeholder: 'Enter your password',
            autocomplete: "off",
        },
    },
    forgotPassword: {
        username: {
            placeholder: 'Enter your username',
            autocomplete: "off",
        },
    },
    confirmResetPassword: {
        confirmation_code: {
            placeholder: 'Enter your confirmation code:',
            label: 'New Label',
            isRequired: false,
            autocomplete: "off",
        },
        confirm_password: {
            placeholder: 'Enter your new password',
            autocomplete: "off",
        },
    },
    setupTotp: {
        QR: {
            totpIssuer: 'test issuer',
            totpUsername: 'amplify_qr_test_user',
        },
        confirmation_code: {
            label: 'New Label',
            placeholder: 'Enter your confirmation code',
            isRequired: false,
            autocomplete: "off",
        },
    },
    confirmSignIn: {
        confirmation_code: {
            label: 'New Label',
            placeholder: 'Enter your confirmation code',
            isRequired: false,
            autocomplete: "off",
        },
    },
};

const Auth = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuthenticator((context) => [context.user]);
    const router = useRouter();
    const pathname = usePathname();

    const isAuthPage = pathname.match(/^\/(signin|signup)$/);
    const isDashboardPage =
        pathname.startsWith("/manager") || pathname.startsWith("/tenants");

    // Redirect authenticated users away from auth pages
    useEffect(() => {
        if (user && isAuthPage) {
            router.push("/");
        }
    }, [user, isAuthPage, router]);

    // Allow access to public pages without authentication
    if (!isAuthPage && !isDashboardPage) {
        return <>{children}</>;
    }

    return (
        <div className="h-full">
            <Authenticator
                initialState={pathname.includes("signup") ? "signUp" : "signIn"}
                components={components}
                formFields={formFields}
                services={{
                    async validateCustomSignUp(formData) {
                        if (!formData.acknowledgement) {
                            return {
                                acknowledgement: 'You have to agree to our policy',
                            };
                        }
                    },
                }}
            >
                {() => <>{children}</>}
            </Authenticator>
        </div>
    );
};

export default Auth;