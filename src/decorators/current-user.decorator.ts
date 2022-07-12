import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = GqlExecutionContext.create(context);
    const { user } = request.getContext().req;
    return user;
  },
);
