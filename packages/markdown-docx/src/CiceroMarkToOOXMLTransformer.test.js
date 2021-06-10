/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// @ts-nocheck
/* eslint-disable no-undef */
'use strict';

const fs = require('fs');
const chai = require('chai');

const expect = chai.expect;

const OoxmlTransformer = require('./OoxmlTransformer');
const CiceroMarkToOOXMLTransfomer = require('./CiceroMarkToOOXMLTransformer');

describe('Perform roundtripping between CiceroMark and OOXML', () => {

    it('should parse paragraphs and emphasis nodes.', async () => {
        const paraAndEmphasisCiceroMark = await fs.readFileSync('test/data/ciceroMark/text-and-emphasis.json', 'utf-8');

        const ciceroMarkTransformer = new CiceroMarkToOOXMLTransfomer();
        const ooxml = ciceroMarkTransformer.toOOXML(JSON.parse(paraAndEmphasisCiceroMark));

        const ooxmlTransformer = new OoxmlTransformer();
        const convertedObject = ooxmlTransformer.toCiceroMark(ooxml);
        expect(convertedObject).to.deep.equal(JSON.parse(paraAndEmphasisCiceroMark));
    });
});