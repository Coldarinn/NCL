import { ExecutionContext, Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Observable } from "rxjs"
import { Reflector } from "@nestjs/core"

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const skipRoles = this.reflector.getAllAndOverride<boolean>("skipRoles", [context.getHandler(), context.getClass()])

    if (skipRoles) {
      return true
    }

    return super.canActivate(context)
  }
}
