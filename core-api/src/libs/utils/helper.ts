import { type FindOptionsWhere } from 'typeorm';
import { customAlphabet } from 'nanoid';
import { ValidationError } from 'class-validator';

type NonFunction<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? never : K]: T[K];
};

type StrippableWhere<T> = {
  [K in keyof FindOptionsWhere<NonFunction<T>>]?: FindOptionsWhere<NonFunction<T>>[K] | undefined;
};

type StrictFindOptionsWhere<T> = FindOptionsWhere<T>;

/**
 * 객체에서 undefined 값을 가진 속성을 제거하고,
 * 그 결과 객체의 정확한 타입 (TypeORM FindOptionsWhere)을 추론합니다.
 * 빈 객체가 될 경우, 스프레드 연산을 위해 {}를 반환합니다.
 */
export function stripUndefined<T>(obj: StrippableWhere<T>): StrictFindOptionsWhere<T> {
  const stripped = Object.keys(obj).reduce((acc: any, prop) => {
    if (obj[prop] !== undefined) {
      acc[prop] = obj[prop];
    }
    return acc;
  }, {});

  // [수정] 빈 객체일 경우 스프레드 연산의 안전성을 위해 {}를 반환합니다.
  if (Object.keys(stripped).length === 0) {
    return {} as StrictFindOptionsWhere<T>;
  }

  // 최종 결과는 TypeORM 검색 조건 객체 타입으로 단언하여 반환합니다.
  return stripped as StrictFindOptionsWhere<T>;
}

export function generateId() {
  return customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 10)();
}

// 🛠️ 가장 깊은 곳에 숨어있는 첫 번째 에러 메시지를 찾아내는 재귀 함수
export const getFirstErrorMessage = (error: ValidationError): string => {
  if (error.constraints) {
    return Object.values(error.constraints)[0];
  }
  if (error.children && error.children.length > 0) {
    return getFirstErrorMessage(error.children[0]);
  }
  return '잘못된 요청입니다.';
};
