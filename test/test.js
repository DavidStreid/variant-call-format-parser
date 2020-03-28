const expect = require("chai").expect;
const { isInvalidVCF, extractDate, extractVariantInfo } = require("../index");
const { VCF } = require('./mocks/mock-vcf');


describe('vcf-parser', () => {
  it('null vcf files are invalid', () => {
    expect(isInvalidVCF(null)).to.be.true;
    expect(isInvalidVCF('')).to.be.false;
  });

  it('Extracts the right date', () => {
    expect(extractDate(VCF).toDateString()).to.equal('Wed Aug 05 2009');
  });

  /**
   * Input file has 5 varaint lines & 12 columns. They have the below lines
   *
   *     #CHROM POS     ID        REF    ALT     QUAL FILTER INFO                              FORMAT       NA00001  ...
   *     20     14370   rs6054257 G      A       29   PASS   NS=3;DP=14;AF=0.5;DB;H2           GT:GQ:DP:HQ  0|0:48:1 ...
   *     20     17330   .         T      A       3    q10    NS=3;DP=11;AF=0.017               GT:GQ:DP:HQ  0|0:49:3 ...
   *     20     1110696 rs6040355 A      G,T     67   PASS   NS=2;DP=10;AF=0.333,0.667;AA=T;DB GT:GQ:DP:HQ  1|2:21:6 ...
   *     20     1230237 .         T      .       47   PASS   NS=3;DP=13;AA=T                   GT:GQ:DP:HQ  0|0:54:7 ...
   *     20     1234567 microsat1 GTCT   G,GTACT 50   PASS   NS=3;DP=9;AA=G                    GT:GQ:DP     0/1:35:4 ...
   *
   */
  it('Extracts the correct mutation information', () => {
    const variantInfo = extractVariantInfo(VCF);

    // Check that 5 objects were extracted
    expect(variantInfo.length).to.equal(5);

    // Check all columns are expected
    const expectedColumns = [ 'CHROM', 'POS', 'ID', 'REF', 'ALT', 'QUAL', 'FILTER', 'INFO',
                              'FORMAT', 'NA00001', 'NA00002', 'NA00003'];
    for (const vi of variantInfo) {
      for ( const column of expectedColumns ) {
        expect( column in vi ).to.be.true;
      }
    }

    // TODO - Check all
    const checked = variantInfo[2];

    expect(checked['CHROM']).to.equal('20');
    expect(checked['POS']).to.equal('1110696');
    expect(checked['ID']).to.equal('rs6040355');
    expect(checked['REF']).to.equal('A');
    expect(checked['ALT']).to.equal('G,T');
    expect(checked['QUAL']).to.equal('67');
    expect(checked['FILTER']).to.equal('PASS');
    expect(checked['INFO']).to.equal('NS=2;DP=10;AF=0.333,0.667;AA=T;DB');
    expect(checked['FORMAT']).to.equal('GT:GQ:DP:HQ');
    expect(checked['NA00001']).to.equal('1|2:21:6:23,27');
    expect(checked['NA00002']).to.equal('2|1:2:0:18,2');
    expect(checked['NA00003']).to.equal('2/2:35:4');
  });
});
