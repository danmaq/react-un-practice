import renderLayers, { Layer } from './renderLayers';

describe.each([[['a', 'c', 'b']]])(
  `renderLayers(%p) の結果を使用した検証`,
  (rule) => {
    let render: (...layers: Layer<string, number>[]) => number[];
    beforeAll(() => {
      render = renderLayers(rule);
    });
    it.each<[Layer<string, number>, number[]]>([
      [{ a: 1, b: 2 }, [1, 2]],
      [{ a: 2, b: 1 }, [2, 1]],
      [{ a: 2, b: [1, -1] }, [2, 1, -1]],
      [{ a: [-1, 3], b: 2 }, [-1, 3, 2]],
      [{ a: [-1, 3], b: [2, 4] }, [-1, 3, 2, 4]],
      [{ a: [-1, 3], b: [2, 3], c: 5 }, [-1, 3, 5, 2, 3]],
      [{ a: [-1, 3], b: [2, 4], c: 5, d: [1, 0] }, [-1, 3, 5, 2, 4]],
      [{ a: [-1, 3], c: 4 }, [-1, 3, 4]],
    ])('(%j) => %p', (source, expected) =>
      expect(render(source)).toStrictEqual(expected)
    );
  }
);

describe.each([[[0, 2, 1]]])(
  `renderLayers(%p) の結果を使用した検証`,
  (rule) => {
    let render: (...layers: Layer<number, string>[]) => string[];
    beforeAll(() => {
      render = renderLayers(rule);
    });
    it.each<[Layer<number, string>, string[]]>([
      [{ 0: 'x', 1: 'y' }, ['x', 'y']],
      [{ 0: 'y', 1: 'x' }, ['y', 'x']],
      [{ 0: 'y', 1: ['x', 'o'] }, ['y', 'x', 'o']],
      [{ 0: ['o', 'w'], 1: 'y' }, ['o', 'w', 'y']],
      [{ 0: ['o', 'w'], 1: ['y', 'v'] }, ['o', 'w', 'y', 'v']],
      [{ 0: ['o', 'w'], 1: ['y', 'w'], 2: 'u' }, ['o', 'w', 'u', 'y', 'w']],
      [
        { 0: ['o', 'w'], 1: ['y', 'v'], 2: 'u', 3: ['o', 'w'] },
        ['o', 'w', 'u', 'y', 'v'],
      ],
      [{ 0: ['o', 'w'], 1: 'v' }, ['o', 'w', 'v']],
    ])('(%j) => %p', (source, expected) =>
      expect(render(source)).toStrictEqual(expected)
    );
  }
);
