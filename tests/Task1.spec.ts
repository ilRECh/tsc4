import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, beginCell, toNano } from 'ton-core';
import { Task1 } from '../wrappers/Task1';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Task1', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Task1');
    });

    let blockchain: Blockchain;
    let task1: SandboxContract<Task1>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        task1 = blockchain.openContract(Task1.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await task1.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: task1.address,
            deploy: true,
            success: true,
        });
    });

    it('should return DEADBEEF', async () => {
        // the check is done inside beforeEach
        // blockchain and task1 are ready to use

        let cell = beginCell().storeUint(0xDEADBEEF, 32).endCell();
        let cellHash = cell.hash();
        let cellTree = beginCell()
        .storeUint(1, 16)
            .storeRef(beginCell()
                .storeUint(5, 16)
                .endCell())
            .storeRef(beginCell()
                .storeUint(5, 16)
                .endCell())
            .storeRef(beginCell()
                .storeUint(5, 16)
                .endCell())
            .storeRef(beginCell()
                .storeUint(3, 16)
                .storeRef(beginCell()
                    .storeUint(5, 16)
                    .endCell())
                .storeRef(beginCell()
                    .storeUint(5, 16)
                    .storeRef(beginCell()
                        .storeUint(5, 16)
                        .endCell())
                    .storeRef(beginCell()
                        .storeUint(5, 16)
                        .storeRef(beginCell()
                            .storeUint(5, 16)
                            .endCell())
                        .storeRef(beginCell()
                            .storeRef(beginCell()
                                .storeUint(5, 16)
                                .endCell())
                            .storeUint(5, 16)
                            .storeRef(beginCell()
                                .storeRef(beginCell()
                                    .storeUint(5, 16)
                                    .endCell())
                                .storeUint(5, 16)
                                .storeRef(beginCell()
                                    .storeRef(beginCell()
                                        .storeUint(5, 16)
                                        .endCell())
                                    .storeUint(5, 16)
                                    .storeRef(beginCell()
                                        .storeUint(5, 16)
                                        .storeRef(beginCell()
                                            .storeUint(5, 16)
                                            .endCell())
                                        .storeRef(cell)
                                        .endCell())
                                    .endCell())
                                .endCell())
                            .endCell())
                        .endCell())
                    .storeRef(beginCell()
                        .storeUint(5, 16)
                        .endCell())
                    .endCell())
                .storeRef(beginCell()
                    .storeUint(5, 16)
                .endCell())
            .endCell())
        .endCell();

        let result = await blockchain.runGetMethod(task1.address, 'find_branch_by_hash', [
            {type: 'int', value: BigInt("0x" + cellHash.toString('hex'))},
            {type: 'cell', cell: cellTree}
        ]);

        console.log(result);
        console.log(result.gasUsed);
    });

    it('should return empty cell', async () => {
        // the check is done inside beforeEach
        // blockchain and task1 are ready to use

        let cell = beginCell().storeUint(0xDEADBEEF, 32).endCell();
        let cellHash = cell.hash();
        let cellTree = beginCell()
        .storeUint(1, 16)
            .storeRef(beginCell()
                .storeUint(5, 16)
                .endCell())
            .storeRef(beginCell()
                .storeUint(5, 16)
                .endCell())
            .storeRef(beginCell()
                .storeUint(5, 16)
                .endCell())
            .storeRef(beginCell()
                .storeUint(3, 16)
                .storeRef(beginCell()
                    .storeUint(5, 16)
                    .endCell())
                .storeRef(beginCell()
                    .storeUint(5, 16)
                    .storeRef(beginCell()
                        .storeUint(5, 16)
                        .endCell())
                    .storeRef(beginCell()
                        .storeUint(5, 16)
                        .storeRef(beginCell()
                            .storeUint(5, 16)
                            .endCell())
                        .storeRef(beginCell()
                            .storeRef(beginCell()
                                .storeUint(5, 16)
                                .endCell())
                            .storeUint(5, 16)
                            .storeRef(beginCell()
                                .storeRef(beginCell()
                                    .storeUint(5, 16)
                                    .endCell())
                                .storeUint(5, 16)
                                .storeRef(beginCell()
                                    .storeRef(beginCell()
                                        .storeUint(5, 16)
                                        .endCell())
                                    .storeUint(5, 16)
                                    .storeRef(beginCell()
                                        .storeUint(5, 16)
                                        .storeRef(beginCell()
                                            .storeUint(5, 16)
                                            .endCell())
                                        .endCell())
                                    .endCell())
                                .endCell())
                            .endCell())
                        .endCell())
                    .storeRef(beginCell()
                        .storeUint(5, 16)
                        .endCell())
                    .endCell())
                .storeRef(beginCell()
                    .storeUint(5, 16)
                .endCell())
            .endCell())
        .endCell();

        let result = await blockchain.runGetMethod(task1.address, 'find_branch_by_hash', [
            {type: 'int', value: BigInt("0x" + cellHash.toString('hex'))},
            {type: 'cell', cell: cellTree}
        ]);

        console.log(result);
        console.log(result.gasUsed);
    });
});
