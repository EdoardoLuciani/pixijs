import { SmoothGraphics } from '~/scene';

import type { TestScene } from '../../types';
import type { Container } from '~/scene';

export const scene: TestScene = {
    it: 'should keep thin and translucent rectangle fills uniform after scaling and reflection',
    excludeRenderers: ['canvas'],
    pixelMatch: 0,
    pixelMatchLocal: 0,
    create: async (scene: Container) =>
    {
        for (const batchMode of ['batch', 'no-batch'] as const)
        {
            const graphics = new SmoothGraphics()
                .rect(8, 0, 112, 4).fill(0xffffff)
                .rect(8.25, 12.25, 112, 1)
                .fill(0xffffff)
                .rect(8.25, 24.25, 112, 0.5)
                .fill({ color: 0xffffff, alpha: 0.5 })
                .rect(8, 36, 112, 2)
                .fill({ color: 0xffcc00, alpha: 0.5 });

            graphics.context.batchMode = batchMode;
            graphics.y = batchMode === 'batch' ? 8 : 72;
            if (batchMode === 'no-batch')
            {
                graphics.x = 128;
                graphics.scale.set(-1, 0.75);
                graphics.rotation = 0.05;
            }
            scene.addChild(graphics);
        }
    },
};
