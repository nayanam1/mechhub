
        // ============ 사이드바 ============
        function createSidebarMenu() {
            const menuItems = [
                { name: '🏠 메인 홈', href: 'index.html', status: '' },
                { name: '1. 기계제도 & RF & EMI', href: 'javascript:void(0)', status: 'ready' },
                { name: '2. Steel 소재 (구현됨) ⚡', href: 'steel_material.html', status: '' },
                { name: '3. Stainless 소재 (구현됨) ⚡', href: 'stainless_material.html', status: '' },
                { name: '4. Aluminum 소재 (구현됨) ⚡', href: 'aluminum_material.html', status: '' },
                { name: '5. 수지/세라믹/기타 (구현됨) ⚡', href: 'resin_material.html', status: '' },
                { name: '6. 기계가공 (구현됨) ⚡', href: 'index.html#machining-section', status: '' },
                { name: '7. 기계요소 (구현됨) ⚡', href: 'index.html#elements-section', status: '' },
                { name: '8. 요소설계 & 계산 (구현됨) ⚡', href: 'index.html#mecha-section', status: 'current' },
                { name: '9. 진공부품', href: 'javascript:void(0)', status: 'ready' },
                { name: '10. Vision Camera', href: 'javascript:void(0)', status: 'ready' },
                { name: '11. Electricity & Control', href: 'javascript:void(0)', status: 'ready' },
                { name: '12. Utility 선정 & 반응', href: 'javascript:void(0)', status: 'ready' },
                { name: '13. 기판 & Vibration', href: 'javascript:void(0)', status: 'ready' },
                { name: '14. Transportation & ETC', href: 'javascript:void(0)', status: 'ready' },
            ];
            const menuUl = document.getElementById('sidebarMenu');
            menuUl.innerHTML = menuItems.map(item => `
                <li class="${item.status === 'ready' ? 'ready' : ''} ${item.status === 'current' ? 'active' : ''}">
                    <a href="${item.href}">${item.name}${item.status === 'ready' ? ' <span class="badge-ready">준비중</span>' : ''}</a>
                </li>`).join('');
        }

        // ============ 물성 데이터 (원본: HTF-7500 Property 개선 후.pdf) ============
        const FLUID_TEMPS = [-80,-70,-65,-60,-50,-40,-30,-20,-10,0,10,20,25,30,40,50,60,70,80,90,100,110,120,130];
        const FLUID_DATA = {
            'HTF-7500': {
                density: [1.9642,1.9402,1.9282,1.9094,1.8881,1.8657,1.8432,1.8205,1.7978,1.7748,1.7515,1.7280,1.7159,1.7037,1.6795,1.6549,1.6299,1.6045,1.5787,1.5527,1.5322,1.5082,1.4842,1.4602],
                viscosity: [33.0809,20.7231,16.4028,12.9590,7.8147,5.1101,3.5399,2.5673,1.9410,1.5104,1.2145,1.2066,0.9190,0.8558,0.7407,0.6533,0.5882,0.5253,0.4603,0.3615,0.2312,0.1866,0.1507,0.1217],
                cp: [0.8800,0.8900,0.8900,0.90,0.92,0.94,0.95,0.97,0.98,1.00,1.02,1.03,1.04,1.05,1.07,1.08,1.10,1.12,1.13,1.15,1.16,1.18,1.20,1.21],
                vp: [0.0040,0.0090,0.0116,0.0151,0.0235,0.0464,0.0842,0.1273,0.2414,0.3307,0.4538,0.7962,1.1127,1.7214,2.8681,4.6311,6.8628,10.3450,15.3560,25.1490,37.0860,59.9740,75.6890,96.9280],
                k: [0.0714,0.0708,0.0705,0.0702,0.0696,0.0691,0.0685,0.0679,0.0673,0.0667,0.0661,0.0655,0.0651,0.0649,0.0643,0.0637,0.0631,0.0625,0.0619,0.0613,0.0607,0.0601,0.0595,0.0589]
            },
            'Novec-7500': {
                density: [1.8326,1.8117,1.8013,1.7909,1.7492,1.7283,1.7179,1.7075,1.6866,1.6658,1.6450,1.6241,1.6137,1.6033,1.5824,1.5616,1.5407,1.5199,1.4990,1.4782,1.4574,1.4365,1.4157,1.3948],
                viscosity: [42.5349,17.7228,12.4259,9.0935,3.5452,2.5144,2.1654,1.8878,1.4789,1.1957,0.9901,0.8352,0.7715,0.7151,0.6200,0.5434,0.4809,0.4294,0.3864,0.3505,0.3201,0.2944,0.2725,0.2537],
                cp: [0.9711,0.9861,0.9936,1.00,1.03,1.05,1.05,1.06,1.08,1.09,1.11,1.12,1.13,1.14,1.15,1.17,1.18,1.20,1.21,1.23,1.24,1.26,1.27,1.29],
                vp: [0.0007,0.0023,0.0038,0.0062,0.0368,0.0801,0.1154,0.1640,0.3178,0.5870,1.0380,1.7656,2.2721,2.8998,4.6140,7.1335,10.7442,15.8007,22.7348,32.0631,44.3931,60.4297,80.9788,106.9512],
                k: [0.0861,0.0837,0.0825,0.0813,0.0769,0.0748,0.0738,0.0728,0.0708,0.0690,0.0672,0.0656,0.0648,0.0640,0.0625,0.0611,0.0597,0.0585,0.0573,0.0563,0.0553,0.0544,0.0535,0.0528]
            }
        };

        function interp(t, arr) {
            const temps = FLUID_TEMPS;
            if (t <= temps[0]) return arr[0];
            if (t >= temps[temps.length - 1]) return arr[arr.length - 1];
            for (let i = 0; i < temps.length - 1; i++) {
                if (t >= temps[i] && t <= temps[i + 1]) {
                    const ratio = (t - temps[i]) / (temps[i + 1] - temps[i]);
                    return arr[i] + ratio * (arr[i + 1] - arr[i]);
                }
            }
            return arr[arr.length - 1];
        }

        function fmt(n, d) { return isFinite(n) ? n.toFixed(d) : '-'; }

        // ============ STEP 1 : 물성 조회 ============
        function lookupFluid() {
            const fluid = document.getElementById('fluidSelect').value;
            const t = parseFloat(document.getElementById('fluidTemp').value);
            const d = FLUID_DATA[fluid];
            const rho = interp(t, d.density);
            const nu = interp(t, d.viscosity);
            const cp = interp(t, d.cp);
            const vp = interp(t, d.vp);
            const k = interp(t, d.k);

            document.getElementById('resRho').innerHTML = fmt(rho, 4) + '<span>kg/L</span>';
            document.getElementById('resCp').innerHTML = fmt(cp, 3) + '<span>kJ/kg·℃</span>';
            document.getElementById('resNu').innerHTML = fmt(nu, 3) + '<span>cSt</span>';
            document.getElementById('resVp').innerHTML = fmt(vp, 4) + '<span>kPa</span>';
            document.getElementById('resK').innerHTML = fmt(k, 4) + '<span>W/m·℃</span>';

            ['rho2','rho5','rho6','rho7'].forEach(id => document.getElementById(id).value = rho.toFixed(4));
            document.getElementById('cp2').value = cp.toFixed(3);
            document.getElementById('nu4').value = nu.toFixed(3);
            document.getElementById('nu7').value = nu.toFixed(3);
            ['flagRho2','flagRho7','flagNu7'].forEach(id => document.getElementById(id).style.display = 'inline');

            calcFlow();
        }

        // ============ STEP 2 : 필요 유량 ============
        function calcFlow() {
            const Q = parseFloat(document.getElementById('q_heat').value);
            const rho = parseFloat(document.getElementById('rho2').value);
            const cp = parseFloat(document.getElementById('cp2').value);
            const dT = parseFloat(document.getElementById('dT2').value);
            const lines = parseFloat(document.getElementById('lineCount2').value) || 1;

            const vdotTotal = (Q * 60) / (rho * cp * dT);
            const vdotLine = vdotTotal / lines;

            document.getElementById('resVdotTotal').innerHTML = fmt(vdotTotal, 1) + '<span>LPM</span>';
            document.getElementById('resVdotLine').innerHTML = fmt(vdotLine, 1) + '<span>LPM</span>';

            document.getElementById('vdot3').value = vdotLine.toFixed(2);
            document.getElementById('flagVdot3').style.display = 'inline';

            calcVelocity();
        }

        // ============ STEP 3 : 유속 / 내경 ============
        function setPipeD(mm) {
            document.getElementById('d3').value = mm;
            calcVelocity();
        }

        function calcVelocity() {
            const vdot = parseFloat(document.getElementById('vdot3').value);
            const D = parseFloat(document.getElementById('d3').value);
            const Dm = D / 1000;
            const v = (4 * vdot) / (60000 * Math.PI * Dm * Dm);

            document.getElementById('resV3').innerHTML = fmt(v, 3) + '<span>m/s</span>';

            document.getElementById('v4').value = v.toFixed(3);
            document.getElementById('d4').value = D;
            document.getElementById('v5').value = v.toFixed(3);
            document.getElementById('d5').value = D;
            document.getElementById('d7').value = D;
            document.getElementById('flagV4').style.display = 'inline';
            document.getElementById('flagD7').style.display = 'inline';

            calcReynolds();
        }

        function calcDiameter() {
            const vdot = parseFloat(document.getElementById('vdot3').value);
            const vt = parseFloat(document.getElementById('vTarget3').value);
            const Dm = Math.sqrt((4 * vdot) / (60000 * Math.PI * vt));
            const Dmm = Dm * 1000;
            document.getElementById('resD3').innerText = fmt(Dmm, 3) + ' mm';
        }

        function applyDiameter() {
            const txt = document.getElementById('resD3').innerText;
            const val = parseFloat(txt);
            if (isFinite(val)) {
                document.getElementById('d3').value = val.toFixed(3);
                calcVelocity();
            }
        }

        // ============ STEP 4 : 레이놀즈수 & 마찰계수 ============
        function setRough(mm) {
            document.getElementById('eps4').value = mm;
            calcReynolds();
        }

        function calcReynolds() {
            const v = parseFloat(document.getElementById('v4').value);
            const D = parseFloat(document.getElementById('d4').value);
            const nu = parseFloat(document.getElementById('nu4').value);
            const eps = parseFloat(document.getElementById('eps4').value);

            const Re = (v * D * 1000) / nu;

            function fTurb(Re) {
                const term = (eps / (3.7 * D)) + (5.74 / Math.pow(Re, 0.9));
                return 0.25 / Math.pow(Math.log10(term), 2);
            }

            let f, regime;
            if (Re < 2300) {
                f = 64 / Re;
                regime = '층류 (Laminar)';
            } else if (Re < 4000) {
                const fLam = 64 / 2300;
                const fTur = fTurb(4000);
                const ratio = (Re - 2300) / (4000 - 2300);
                f = fLam + ratio * (fTur - fLam);
                regime = '천이영역 (Transition)';
            } else {
                f = fTurb(Re);
                regime = '난류 (Turbulent)';
            }

            document.getElementById('resRe4').innerText = isFinite(Re) ? Math.round(Re).toLocaleString() : '-';
            document.getElementById('resRegime4').innerText = regime;
            document.getElementById('resF4').innerText = fmt(f, 4);

            document.getElementById('f5').value = f.toFixed(4);
            document.getElementById('flagF5').style.display = 'inline';

            calcPressureDrop();
        }

        // ============ STEP 5 : 압력손실 ============
        function setK(val) { document.getElementById('k5').value = val; calcPressureDrop(); }
        function addK(val) {
            const cur = parseFloat(document.getElementById('k5').value) || 0;
            document.getElementById('k5').value = (cur + val).toFixed(2);
            calcPressureDrop();
        }

        function calcPressureDrop() {
            const f = parseFloat(document.getElementById('f5').value);
            const L = parseFloat(document.getElementById('l5').value);
            const D = parseFloat(document.getElementById('d5').value);
            const Dm = D / 1000;
            const rho = parseFloat(document.getElementById('rho5').value) * 1000; // kg/L -> kg/m3
            const v = parseFloat(document.getElementById('v5').value);
            const K = parseFloat(document.getElementById('k5').value) || 0;

            const dPfricPa = f * (L / Dm) * (rho * v * v / 2);
            const dPlocPa = K * (rho * v * v / 2);
            const dPfricBar = dPfricPa / 100000;
            const dPlocBar = dPlocPa / 100000;
            const dPtotalBar = dPfricBar + dPlocBar;

            document.getElementById('resDPfric').innerHTML = fmt(dPfricBar, 3) + '<span>bar</span>';
            document.getElementById('resDPloc').innerHTML = fmt(dPlocBar, 3) + '<span>bar</span>';
            document.getElementById('resDPtotal').innerHTML = fmt(dPtotalBar, 3) + '<span>bar</span>';

            document.getElementById('dp6').value = dPtotalBar.toFixed(3);
            document.getElementById('flagDP6').style.display = 'inline';

            document.getElementById('l7').value = L;
            document.getElementById('k7').value = K;
            document.getElementById('flagL7').style.display = 'inline';
            document.getElementById('flagK7').style.display = 'inline';

            calcPump();
        }

        // ============ STEP 6 : 펌프 압력 & 판정 ============
        function calcPump() {
            const H = parseFloat(document.getElementById('h6').value);
            const rho = parseFloat(document.getElementById('rho6').value) * 1000; // kg/L -> kg/m3
            const dP = parseFloat(document.getElementById('dp6').value);

            const Ppump = (rho * 9.81 * H) / 100000;
            const margin = Ppump - dP;

            document.getElementById('resPpump').innerHTML = fmt(Ppump, 3) + '<span>bar</span>';
            document.getElementById('resDPref').innerHTML = fmt(dP, 3) + '<span>bar</span>';
            document.getElementById('resMargin').innerHTML = fmt(margin, 3) + '<span>bar</span>';

            const vBox = document.getElementById('verdictBox');
            vBox.style.display = 'flex';
            if (margin >= 0) {
                vBox.className = 'verdict-box verdict-ok';
                vBox.innerHTML = `✅ 차압 여유 ${fmt(margin,2)} bar &nbsp;→&nbsp; 목표 유량 충족<div class="sub">펌프 토출압(${fmt(Ppump,2)}bar)이 배관 압력손실(${fmt(dP,2)}bar)보다 커서 정상 유량 확보가 가능합니다.</div>`;
            } else {
                vBox.className = 'verdict-box verdict-warn';
                vBox.innerHTML = `⚠ 차압 여유 ${fmt(margin,2)} bar &nbsp;→&nbsp; 목표 유량 부족 (재검토 필요)<div class="sub">배관경 확대, 병렬 라인 증설, 고양정 펌프 변경 또는 목표 ΔT 완화를 검토하세요.</div>`;
            }

            updateSummary();
        }

        // ============ 종합 요약 ============
        function updateSummary() {
            const fluid = document.getElementById('fluidSelect').value;
            const temp = document.getElementById('fluidTemp').value;
            document.getElementById('sumFluid').innerText = `${fluid} / ${temp}℃`;
            document.getElementById('sumFlow').innerText = `${document.getElementById('resVdotTotal').innerText.replace('LPM','')} / ${document.getElementById('resVdotLine').innerText.replace('LPM','')} LPM`;
            document.getElementById('sumPipe').innerText = `Ø${document.getElementById('d5').value}mm / ${document.getElementById('resV3').innerText}`;
            document.getElementById('sumRe').innerText = `${document.getElementById('resRe4').innerText} / ${document.getElementById('resRegime4').innerText} / f=${document.getElementById('resF4').innerText}`;
            document.getElementById('sumDP').innerText = document.getElementById('resDPtotal').innerText;
            const margin = parseFloat(document.getElementById('resMargin').innerText);
            document.getElementById('sumVerdict').innerText = `${fmt(margin,2)} bar (${margin >= 0 ? '충족' : '부족'})`;
        }

        // ============ 비교표 저장 ============
        let savedCases = [];
        let caseSeq = 0;

        function saveCase() {
            caseSeq++;
            const fluid = document.getElementById('fluidSelect').value;
            const temp = document.getElementById('fluidTemp').value;
            const c = {
                id: caseSeq,
                label: `${fluid} / ${temp}℃ / Ø${document.getElementById('d5').value}mm`,
                flow: document.getElementById('resVdotLine').innerText,
                v: document.getElementById('resV3').innerText,
                re: `${document.getElementById('resRe4').innerText} / ${document.getElementById('resRegime4').innerText}`,
                f: document.getElementById('resF4').innerText,
                dp: document.getElementById('resDPtotal').innerText,
                ppump: document.getElementById('resPpump').innerText,
                margin: document.getElementById('resMargin').innerText,
                ok: parseFloat(document.getElementById('resMargin').innerText) >= 0
            };
            savedCases.push(c);
            renderCaseTable();
        }

        function deleteCase(id) {
            savedCases = savedCases.filter(c => c.id !== id);
            renderCaseTable();
        }

        function renderCaseTable() {
            const tbody = document.getElementById('caseTableBody');
            if (savedCases.length === 0) {
                tbody.innerHTML = '<tr><td colspan="10" style="color:#94a3b8;">저장된 비교 조건이 없습니다. [➕ 비교표에 저장]으로 25℃/-60℃ 등 조건을 비교해 보세요.</td></tr>';
                return;
            }
            tbody.innerHTML = savedCases.map(c => `
                <tr>
                    <td>${c.label}</td>
                    <td class="num">${c.flow}</td>
                    <td class="num">${c.v}</td>
                    <td>${c.re}</td>
                    <td>${c.f}</td>
                    <td class="num">${c.dp}</td>
                    <td class="num">${c.ppump}</td>
                    <td class="num" style="color:${c.ok ? '#16a34a' : '#dc2626'}; font-weight:700;">${c.margin}</td>
                    <td style="color:${c.ok ? '#16a34a' : '#dc2626'}; font-weight:700;">${c.ok ? '충족' : '부족'}</td>
                    <td class="del-btn" onclick="deleteCase(${c.id})">✕</td>
                </tr>`).join('');
        }

        // ============ STEP 7 : Hz 프로파일(펌프 동작점) ============
        const PUMP_PCT = [37, 40, 50, 60, 70, 80, 90, 100];
        const PUMP_HZ = PUMP_PCT.map(p => Math.round(46.8 * p / 100 * 100) / 100);

        function buildPumpProfileRef() {
            document.getElementById('pctRow').innerHTML = '<td style="font-weight:700; text-align:left;">출력 (%)</td>' +
                PUMP_PCT.map(p => `<td>${p}%</td>`).join('');
            document.getElementById('hzRow').innerHTML = '<td style="font-weight:700; text-align:left;">주파수 (Hz)</td>' +
                PUMP_HZ.map(h => `<td>${h.toFixed(2)}Hz</td>`).join('');
        }

        function frictionFactor7(Re, eps, D) {
            if (Re < 2300) return 64 / Re;
            const fTurb = (ReVal) => {
                const term = (eps / (3.7 * D)) + (5.74 / Math.pow(ReVal, 0.9));
                return 0.25 / Math.pow(Math.log10(term), 2);
            };
            if (Re < 4000) {
                const fLam = 64 / 2300;
                const fTur = fTurb(4000);
                const ratio = (Re - 2300) / (4000 - 2300);
                return fLam + ratio * (fTur - fLam);
            }
            return fTurb(Re);
        }

        function systemHeadM(Q, D, L, K, rhoKgL, nuCst, eps) {
            const Dm = D / 1000;
            const v = (4 * Q) / (60000 * Math.PI * Dm * Dm);
            const Re = (v * D * 1000) / nuCst;
            const f = frictionFactor7(Re, eps, D);
            const rho = rhoKgL * 1000;
            const dPfricPa = f * (L / Dm) * (rho * v * v / 2);
            const dPlocPa = K * (rho * v * v / 2);
            const dPtotalPa = dPfricPa + dPlocPa;
            return { v, Re, f, dPtotalBar: dPtotalPa / 100000, headM: dPtotalPa / (rho * 9.81) };
        }

        // 상사법칙 기반 펌프 곡선: 60Hz 곡선 H60(Q)=H0-(H0-Hr)*(Q/Qr)^2 를 Hz f로 스케일링
        function pumpHeadM(Q, f, Qr, Hr, H0) {
            if (f <= 0 || Q < 0) return Math.max(H0 * Math.pow(f / 60, 2), 0);
            const Qref = Q * (60 / f);
            let H60 = H0 - (H0 - Hr) * Math.pow(Qref / Qr, 2);
            if (H60 < 0) H60 = 0;
            return H60 * Math.pow(f / 60, 2);
        }

        // 펌프곡선(감소)과 배관 손실곡선(증가)의 교차점을 이분법으로 탐색
        function solveOperatingPoint(f, Qr, Hr, H0, D, L, K, rhoKgL, nuCst, eps) {
            let lo = 0.01, hi = Math.max(Qr * (f / 60) * 3, 5);
            for (let iter = 0; iter < 40; iter++) {
                const mid = (lo + hi) / 2;
                const pH = pumpHeadM(mid, f, Qr, Hr, H0);
                const sysH = systemHeadM(mid, D, L, K, rhoKgL, nuCst, eps).headM;
                if (pH > sysH) lo = mid; else hi = mid;
            }
            const Qsol = (lo + hi) / 2;
            const sys = systemHeadM(Qsol, D, L, K, rhoKgL, nuCst, eps);
            const pumpBar = (rhoKgL * 1000 * 9.81 * pumpHeadM(Qsol, f, Qr, Hr, H0)) / 100000;
            return { Q: Qsol, v: sys.v, Re: sys.Re, f: sys.f, dPbar: sys.dPtotalBar, pumpBar, margin: pumpBar - sys.dPtotalBar };
        }

        function calcPumpProfile() {
            const Qr = parseFloat(document.getElementById('qr60_7').value);
            const Hr = parseFloat(document.getElementById('hr60_7').value);
            const H0 = parseFloat(document.getElementById('h0_7').value);
            const D = parseFloat(document.getElementById('d7').value);
            const L = parseFloat(document.getElementById('l7').value);
            const K = parseFloat(document.getElementById('k7').value) || 0;
            const rho = parseFloat(document.getElementById('rho7').value);
            const nu = parseFloat(document.getElementById('nu7').value);
            const eps = parseFloat(document.getElementById('eps7').value);

            const rows = PUMP_HZ.map((f, i) => {
                const r = solveOperatingPoint(f, Qr, Hr, H0, D, L, K, rho, nu, eps);
                const regime = r.Re < 2300 ? '층류' : (r.Re < 4000 ? '천이' : '난류');
                const ok = r.margin >= 0;
                return `<tr class="${PUMP_PCT[i] === 100 ? 'row-active' : ''}">
                    <td>${PUMP_PCT[i]}%</td>
                    <td>${f.toFixed(2)}</td>
                    <td class="num">${fmt(r.Q, 1)} LPM</td>
                    <td class="num">${fmt(r.v, 2)} m/s</td>
                    <td>${isFinite(r.Re) ? Math.round(r.Re).toLocaleString() : '-'} (${regime})</td>
                    <td>${fmt(r.f, 4)}</td>
                    <td class="num">${fmt(r.dPbar, 3)}</td>
                    <td class="num">${fmt(r.pumpBar, 3)}</td>
                    <td class="num" style="color:${ok ? '#16a34a' : '#dc2626'}; font-weight:700;">${fmt(r.margin, 3)}</td>
                    <td style="color:${ok ? '#16a34a' : '#dc2626'}; font-weight:700;">${ok ? '충족' : '부족'}</td>
                </tr>`;
            }).join('');
            document.getElementById('pumpProfileBody').innerHTML = rows;
        }

        // ============ 참고자료 탭 ============
        function switchRefTab(name, btn) {
            document.querySelectorAll('#ref-prop, #ref-pump').forEach(el => el.classList.remove('active'));
            document.getElementById('ref-' + name).classList.add('active');
            btn.parentElement.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }

        function buildPropTable() {
            const tbody = document.getElementById('propTableBody');
            const h = FLUID_DATA['HTF-7500'];
            const n = FLUID_DATA['Novec-7500'];
            tbody.innerHTML = FLUID_TEMPS.map((t, i) => `
                <tr>
                    <td><b>${t}</b></td>
                    <td>${h.density[i].toFixed(4)}</td><td>${h.viscosity[i].toFixed(4)}</td><td>${h.cp[i].toFixed(2)}</td><td>${h.vp[i].toFixed(4)}</td><td>${h.k[i].toFixed(4)}</td>
                    <td>${n.density[i].toFixed(4)}</td><td>${n.viscosity[i].toFixed(4)}</td><td>${n.cp[i].toFixed(2)}</td><td>${n.vp[i].toFixed(4)}</td><td>${n.k[i].toFixed(4)}</td>
                </tr>`).join('');
        }

        window.onload = function() {
            createSidebarMenu();
            buildPropTable();
            buildPumpProfileRef();
            lookupFluid();
            calcPumpProfile();
        };
    