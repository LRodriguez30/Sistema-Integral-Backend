import { Controller, HttpCode, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAccessService } from '../access/access.service';
import { AuthService } from '../../auth.service';
import { RefreshGuard } from './refresh.guard';

@UseGuards(RefreshGuard)
@Controller('auth/refresh')
export class RefreshController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtAccessService: JwtAccessService,
    ) {}
    
    @HttpCode(200)
    @Post('')
    async refresh(
        @Req() req,
        @Res() res
    ) {
        console.log("Solicitando un access token...");

        const accessToken = this.jwtAccessService.generateAccessToken(req.user);
        this.authService.setAuthCookies(res, accessToken);

        const message = {
            "message": "Access token granted..."
        }

        return res.json(message);
    }
}