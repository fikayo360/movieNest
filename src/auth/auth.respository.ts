import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatedUser } from './types';

@Injectable()
export class authDB {
    constructor(private readonly prisma:PrismaService){}
    // methods
     findUsername(username:string){
        return this.prisma.user.findUnique({
            where: {usernamme:username},
        });
    }

    findEmail(email:string){
        return this.prisma.user.findUnique({
            where: {email:email},
        });
    }

    createUser(user:CreatedUser){
        const {email,usernamme,password,role:defaultRole} = user
        return this.prisma.user.create(
            {
                data:{
                  email:email,usernamme:usernamme,password,hashedRt:'',resettoken:'',role:defaultRole
                }
              }
        )
    }

    updateUserResetToken(email:string,resetToken:string){
        return this.prisma.user.update({
            where:{
              email:email
            },
            data:{
              resettoken:resetToken
            }
          })
    }

    updateHashToken(id:string,newToken:string){
        return this.prisma.user.update({
            where:{
              id:id
            },
            data:{
              password:newToken,
              resettoken:null
            }
          })
    }

    updateRefreshToNull(id:string){
        return this.prisma.user.updateMany({
            where: {
              id: id,
              hashedRt: {
                not: null,
              },
            },
            data: {
              hashedRt: null,
            },
          });
    }

    updateRefreshTokenHash(id:string,hash:string){
        return this.prisma.user.update({
            where: {
              id: id,
            },
            data: {
              hashedRt:hash
            },
          });
    }

    findId(id:string){
        return this.prisma.user.findUnique({
            where: {
              id: id,
            },
          });
    }


}