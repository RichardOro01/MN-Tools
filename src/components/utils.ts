import { parser, derivative, parse } from 'mathjs';

export const fun = (equation: string, x: number) => {
    // return eval(equation.replace(' ',''));
    const parse = parser();
    parse.evaluate(`f(x) = ${equation}`);
    
    return Number(parse.evaluate(`f(${x})`));
}

export const df = (equation: string, x: number, grade=1) => {
    const parsed = parse(equation);
    let df = parsed;
    for (let i=0; i<grade; i++){
        df = derivative(df, 'x');
    }
    return df.evaluate({x: x});
}
