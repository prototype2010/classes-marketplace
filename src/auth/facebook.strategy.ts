import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { VerifyCallback } from 'passport-google-oauth20';
import { Profile, Strategy } from 'passport-facebook';
import { facebook } from 'config';

export interface FacebookUser {
  facebookId: number;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
}

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: facebook.clientId,
      clientSecret: facebook.clientCode,
      callbackURL: 'http://localhost:3000/auth/facebook/redirect',
      scope: 'email',
      profileFields: ['email', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails } = profile;
    const { familyName, givenName } = name;
    const user: FacebookUser = {
      facebookId: Number(id),
      firstName: familyName,
      lastName: givenName,
      accessToken,
      email: emails?.[0]?.value,
    };
    done(null, user);
  }
}
