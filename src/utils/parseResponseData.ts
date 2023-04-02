import { ResponseData } from 'src/shared/shared.interface';

export function OkResponse(
  data: any,
  message: string,
  statusCode: string | number = 200,
): ResponseData {
  return {
    status: true,
    statusCode,
    message,
    data: data,
  };
}
