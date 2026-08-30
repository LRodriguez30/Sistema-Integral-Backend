import { Injectable } from '@nestjs/common';
import {
    ConfidentialClientApplication,
    Configuration,
} from '@azure/msal-node';

import { ConfigService } from '@nestjs/config';


@Injectable()
export class MicrosoftService {

    private readonly msalClient:
        ConfidentialClientApplication;


    constructor(
        private readonly configService: ConfigService,
    ) {

        const config: Configuration = {

            auth: {

                clientId:
                    this.configService.getOrThrow<string>(
                        'MICROSOFT_CLIENT_ID',
                    ),

                clientSecret:
                    this.configService.getOrThrow<string>(
                        'MICROSOFT_CLIENT_SECRET',
                    ),

                authority:
                    `https://login.microsoftonline.com/` +
                    this.configService.getOrThrow<string>(
                        'MICROSOFT_TENANT_ID',
                    ),
            },
        };


        this.msalClient =
            new ConfidentialClientApplication(config);
    }


    async getAuthorizationUrl(): Promise<string> {

        return this.msalClient.getAuthCodeUrl({

            scopes: [
                'openid',
                'profile',
                'email',
                'User.Read',
            ],

            redirectUri:
                this.configService.getOrThrow<string>(
                    'MICROSOFT_REDIRECT_URI',
                ),
        });
    }


    async getTokensFromCode(
        code: string,
    ) {

        return this.msalClient.acquireTokenByCode({

            code,

            scopes: [
                'openid',
                'profile',
                'email',
                'User.Read',
            ],

            redirectUri:
                this.configService.getOrThrow<string>(
                    'MICROSOFT_REDIRECT_URI',
                ),
        });
    }


    async getMicrosoftUser(
        accessToken: string,
    ) {

        const response = await fetch(
            'https://graph.microsoft.com/v1.0/me',
            {
                headers: {
                    Authorization:
                        `Bearer ${accessToken}`,
                },
            },
        );


        if (!response.ok) {

            throw new Error(
                'No se pudo obtener el usuario de Microsoft.',
            );
        }


        return response.json();
    }
}