import * as ts from 'typescript';
import { VisitorContext } from './visitor-context';
import { Reason } from '../../index';
/**
 * a pair of {@link ts.TemplateLiteralType.texts} and the `intrinsicName`s for {@link ts.TemplateLiteralType.types},
 * @see https://github.com/microsoft/TypeScript/pull/40336
 */
export declare type TemplateLiteralPair = [string, 'string' | 'number' | 'bigint' | 'any' | 'undefined' | 'null' | undefined];
export declare const objectIdentifier: ts.Identifier;
export declare const pathIdentifier: ts.Identifier;
export declare function checkIsClass(type: ts.ObjectType, visitorContext: VisitorContext): boolean;
export declare function checkIsDateClass(type: ts.ObjectType): true | undefined;
export declare function setFunctionIfNotExists(name: string, visitorContext: VisitorContext, factory: () => ts.FunctionDeclaration): string;
interface PropertyInfo {
    name: string;
    type: ts.Type | undefined;
    isMethod: boolean;
    isFunction: boolean;
    isSymbol: boolean;
    optional: boolean;
}
export declare function getPropertyInfo(parentType: ts.Type, symbol: ts.Symbol, visitorContext: VisitorContext): PropertyInfo;
export declare function getTypeAliasMapping(type: ts.TypeReference): Map<ts.Type, ts.Type>;
export declare function getTypeReferenceMapping(type: ts.TypeReference, visitorContext: VisitorContext): Map<ts.Type, ts.Type>;
export declare function getResolvedTypeParameter(type: ts.Type, visitorContext: VisitorContext): ts.Type | undefined;
export declare function getFunctionFunction(visitorContext: VisitorContext): string;
export declare function getStringFunction(visitorContext: VisitorContext): string;
export declare function getBooleanFunction(visitorContext: VisitorContext): string;
export declare function getBigIntFunction(visitorContext: VisitorContext): string;
export declare function getNumberFunction(visitorContext: VisitorContext): string;
export declare function getUndefinedFunction(visitorContext: VisitorContext): string;
export declare function getNullFunction(visitorContext: VisitorContext): string;
export declare function getNeverFunction(visitorContext: VisitorContext): string;
export declare function getUnknownFunction(visitorContext: VisitorContext): string;
export declare function getAnyFunction(visitorContext: VisitorContext): string;
export declare function getIgnoredTypeFunction(visitorContext: VisitorContext): string;
export declare function createBinaries(expressions: ts.Expression[], operator: ts.BinaryOperator, baseExpression?: ts.Expression): ts.Expression;
export declare function createAcceptingFunction(functionName: string): ts.FunctionDeclaration;
export declare function createConjunctionFunction(functionNames: string[], functionName: string, extraStatements?: ts.Statement[]): ts.FunctionDeclaration;
export declare function createDisjunctionFunction(functionNames: string[], functionName: string, visitorContext: VisitorContext): ts.FunctionDeclaration;
export declare function createStrictNullCheckStatement(identifier: ts.Identifier, visitorContext: VisitorContext): ts.EmptyStatement | ts.IfStatement;
export declare function createAssertionFunction(failureCondition: ts.Expression, expected: Reason, functionName: string, visitorContext: VisitorContext, ...otherStatements: ts.Statement[]): ts.FunctionDeclaration;
export declare function createSuperfluousPropertiesLoop(propertyNames: string[], visitorContext: VisitorContext): ts.ForOfStatement;
export declare function isBigIntType(type: ts.Type): number | false;
export declare function createErrorObject(reason: Reason, visitorContext: VisitorContext): ts.Expression;
export declare function getIntrinsicName(type: ts.Type): string | undefined;
export {};
