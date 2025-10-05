import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly apiKey = process.env.BACKEND_API_KEY; // coloque no .env

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || authHeader !== `Bearer ${this.apiKey}`) {
      throw new UnauthorizedException('Chave de API inválida');
    }
    return true;
  }
}
