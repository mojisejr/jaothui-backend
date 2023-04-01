import { ResponseData } from 'src/shared/shared.interface';

export function ErrorResponse(
  data: any,
  message: string,
  statusCode: string | number = 400,
): ResponseData {
  return {
    status: false,
    statusCode,
    message,
    data: data,
  };
}

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
