export function hasData(data: any): boolean {
  try {
    if (Array.isArray(data)) {
      return data.length > 0;
    }
    return data != null || data != undefined || data > 0;
  } catch (error) {
    console.log(error);
  }
}
