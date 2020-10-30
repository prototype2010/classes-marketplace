import { Request } from 'express';

import { User } from '../../entity/user.entity';

export type AuthorizedRequest = Request & { user: User };
