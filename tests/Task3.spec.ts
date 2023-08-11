import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { beginCell, Cell, toNano, TupleReader } from 'ton-core';
import { Task3 } from '../wrappers/Task3';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Task3', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Task3');
    });

    let blockchain: Blockchain;
    let task3: SandboxContract<Task3>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        task3 = blockchain.openContract(Task3.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await task3.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: task3.address,
            deploy: true,
            success: true,
        });
    });

    function dec2bin(dec: number) {
        return (dec >>> 0).toString(2);
      }

    function dump_cell(original: String, cell: Cell, modified: String) {
        let slice = cell.beginParse();

        let strin = "";
        
        while (true) {
            while(slice.remainingBits > 0)
            strin += Number(slice.loadUint(1));

            if(slice.remainingRefs == 0)
                break;

            slice = slice.loadRef().beginParse();
        }

        console.log('Original: ' + original,
                  '\nModified: ' + strin,
                  '\nExpected: ' + modified);
    }

    it('should match 1', async () => {
        // the check is done inside beforeEach
        // blockchain and task3 are ready to 

        let result = await task3.getLinkedList(BigInt(0b1111), BigInt(0b1001), beginCell()
                                                                        .storeUint(0b111100001111, 12)
                                                                        .storeRef(
                                                                            beginCell()
                                                                                .storeUint(0b111100001111, 12)
                                                                            .endCell()
                                                                        )
                                                                       .endCell());
                                                                       
       dump_cell(dec2bin(0b111100001111) + dec2bin(0b111100001111),
                 result.readCell(),
                 dec2bin(0b100100001001) + dec2bin(0b100100001001));
        
    });

    it('should match 2', async () => {
        // the check is done inside beforeEach
        // blockchain and task3 are ready to 

        let result = await task3.getLinkedList(BigInt(0b1111), BigInt(0b1), beginCell()
                                                                        .storeUint(0b111100001111, 12)
                                                                        .storeRef(
                                                                            beginCell()
                                                                                .storeUint(0b111100001111, 12)
                                                                            .endCell()
                                                                        )
                                                                       .endCell());
                                                                       
       dump_cell(dec2bin(0b111100001111) + dec2bin(0b111100001111),
                 result.readCell(),
                 dec2bin(0b100001100001));
        
    });

    it('should match 3', async () => {
        // the check is done inside beforeEach
        // blockchain and task3 are ready to 

        let result = await task3.getLinkedList(BigInt(0b1111), BigInt(0b11), beginCell()
                                                                        .storeUint(0b111100001111, 12)
                                                                        .storeRef(
                                                                            beginCell()
                                                                                .storeUint(0b111100001111, 12)
                                                                            .endCell()
                                                                        )
                                                                       .endCell());
                                                                       
       dump_cell(dec2bin(0b111100001111) + dec2bin(0b111100001111),
                 result.readCell(),
                 dec2bin(0b1100001111000011));
        
    });

    it('should match 4', async () => {
        // the check is done inside beforeEach
        // blockchain and task3 are ready to 

        let result = await task3.getLinkedList(BigInt(0b1111), BigInt(0b111), beginCell()
                                                                        .storeUint(0b111100001111, 12)
                                                                        .storeRef(
                                                                            beginCell()
                                                                                .storeUint(0b111100001111, 12)
                                                                            .endCell()
                                                                        )
                                                                       .endCell());
                                                                       
       dump_cell(dec2bin(0b111100001111) + dec2bin(0b111100001111),
                 result.readCell(),
                 dec2bin(0b11100001111110000111));
        
    });

    // it('give the 24 bits sized value 5', async () => {
    //     // the check is done inside beforeEach
    //     // blockchain and task3 are ready to 

    //     let result = await task3.getLoadFromChunked(BigInt(24), beginCell()
    //                                                             .storeUint(0b111100001111, 12)
    //                                                             .storeRef(
    //                                                                 beginCell()
    //                                                                     .storeUint(0b111100001111, 12)
    //                                                                 .endCell()
    //                                                                     )
    //                                                             .endCell());
                                                                       
    //     console.log('', result.pop(), '\n',
    //     result.pop(), '\n',
    //     result);

    //     if(result.readTupleOpt() != null) {
    //         dump_cell(dec2bin(0b111100001111) + dec2bin(0b111100001111),
    //                  result.readCell(),
    //                  dec2bin(0b11100001111110000111));
    //     }
        
    // });

    // it('give the 24 bits sized value 6', async () => {
    //     // the check is done inside beforeEach
    //     // blockchain and task3 are ready to 

    //     let result = await task3.getLoadFromChunked(BigInt(1), beginCell()
    //                                                             .storeUint(0b111100001111, 12)
    //                                                             .storeRef(
    //                                                                 beginCell()
    //                                                                     .storeUint(0b111100001111, 12)
    //                                                                 .endCell()
    //                                                                     )
    //                                                             .endCell());
                                                                       
    //     console.log('', result.pop(), '\n',
    //     result.pop(), '\n',
    //     result);

    //     dump_cell(dec2bin(0b111100001111111100001111),
    //                 result.readCell(),
    //                 dec2bin(0b11100001111111100001111));
        
    // });
});
