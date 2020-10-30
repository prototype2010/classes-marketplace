import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  simplifyPath(pathArray = []) {
    return pathArray.map(key => `${key}`).join('.');
  }

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value, {
      abortEarly: false,
      allowUnknown: false,
    });
    if (error) {
      const errors2 = error.details.map(({ message, path }) => ({
        message,
        path: this.simplifyPath(path),
      }));

      throw new BadRequestException(errors2);
    }
    return value;
  }
}
