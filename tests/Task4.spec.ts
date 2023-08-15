import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { beginCell, Cell, toNano } from 'ton-core';
import { Task4 } from '../wrappers/Task4';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Task4', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Task4');
    });

    let blockchain: Blockchain;
    let task4: SandboxContract<Task4>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        task4 = blockchain.openContract(Task4.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await task4.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: task4.address,
            deploy: true,
            success: true,
        });
    });

    it('should encrypt', async () => {
        
        let message = 0x61626378797A
        let message2 = 0x41424358595A;
        let message_size = 6 * 8;

        let result = await blockchain.runGetMethod(task4.address, 'caesar_cipher_encrypt', [
            { type: 'int', value: BigInt(4) }, 
            { type: 'cell', cell: beginCell()
            .storeUint(0, 32)
            .storeUint(message, message_size)
            .storeRef(beginCell()
                .storeUint(message2, message_size)
                .endCell())
            .endCell()}
        ]);
        
        console.log(result.stack);
        console.log(result.gasUsed);
    });

    it('should decrypt', async () => {
        
        let message = 0x656667626364;
        let message2 = 0x454647424344;
        let message_size = 6 * 8;

        let result = await blockchain.runGetMethod(task4.address, 'caesar_cipher_decrypt', [
            { type: 'int', value: BigInt(4) }, 
            { type: 'cell', cell: beginCell()
            .storeUint(0, 32)
            .storeUint(message, message_size)
            .storeRef(beginCell()
                .storeUint(message2, message_size)
                .endCell())
            .endCell()}
        ]);
        
        console.log(result.stack);
        console.log(result.gasUsed);
    
    });
});
