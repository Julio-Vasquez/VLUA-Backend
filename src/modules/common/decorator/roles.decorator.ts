import { SetMetadata } from '@nestjs/common';

export const Roles = ( ...rols : string[] ) => SetMetadata( 'rols', rols );