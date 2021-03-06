import React from 'react';
import { View, Text, Alert, ImageBackground, Image, TouchableWithoutFeedback, TextInput, Dimensions, TouchableOpacity, ScrollView, Platform } from 'react-native';
import Modal from "react-native-modal";
import { GoogleSigninButton } from '@react-native-community/google-signin';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import PropTypes from 'prop-types';
import styles from '../../styles';

const { width, height } = Dimensions.get('window')

class LoginScreen extends React.Component {
    static propTypes = {
        isCheckingNickname: PropTypes.bool.isRequired,
        isSubmitting: PropTypes.bool.isRequired,
        agreeTerm: PropTypes.bool.isRequired,
        handleChangeAgreeTerm: PropTypes.func.isRequired,
        handleChangeShowTerm: PropTypes.func.isRequired,
        showTerm: PropTypes.bool.isRequired
    }

    _handleFacebookLogin = () => {
        const { handleFacebookLogin } = this.props;
        LoginManager.logInWithPermissions(['public_profile']).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("login is cancelled.");
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            handleFacebookLogin(data.accessToken.toString())
                        }
                    )
                }
            },
            function (error) {
                console.log("login has error: " + error);
            }
        )
      }

    render(){
        const { isCheckingNickname, isSubmitting, agreeTerm, showTerm, agreeTerm2, showTerm2, agreeAll } = this.props;
        return(
            <ImageBackground source={require('../../assets/images/bg_login.jpg')} resizeMode={'cover'} style={[styles.container, styles.center]}>
                <Modal
                    isVisible={this.props.addInfoModal}
                    onBackButtonPress={this.props.closeAddInfo}
                    onBackdropPress={this.props.closeAddInfo}
                    style={[styles.center, styles.pb30]}
                >
                    {showTerm ?
                        <View style={[styles.loginModal, styles.alignItemsCenter, styles.justifyContentCenter, styles.py15, {width: width-50}]}>
                            <Text style={[styles.fontBold, styles.font16, styles.textCenter]}>
                                아틔움 개인정보처리방침
                            </Text>
                            <ScrollView style={[styles.px10, styles.py10, {height: height - 300}]} scrollEnabled={true}>
                                <Text style={[styles.fontMedium, styles.font12, styles.mb20]}>
                                    {`<포브(Fov)>('www.artuium.com'이하 '아틔움')은(는) 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.

<포브(Fov)>('아틔움') 은(는) 회사는 개인정보처리방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.

○ 본 방침은부터 2019년 12월 17일부터 시행됩니다.

1. 개인정보의 처리 목적 <포브(Fov)>('www.artuium.com'이하 '아틔움')은(는) 개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는 다음의 목적이외의 용도로는 사용되지 않으며 이용 목적이 변경될 시에는 사전동의를 구할 예정입니다.

가. 홈페이지 회원가입 및 관리

회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정이용 방지, 각종 고지·통지 등을 목적으로 개인정보를 처리합니다.

나. 민원사무 처리

민원인의 신원 확인, 민원사항 확인 등을 목적으로 개인정보를 처리합니다.

다. 재화 또는 서비스 제공

서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공, 본인인증 등을 목적으로 개인정보를 처리합니다.

라. 마케팅 및 광고에의 활용

이벤트 및 광고성 정보 제공 및 참여기회 제공 , 인구통계학적 특성에 따른 서비스 제공 및 광고 게재 , 서비스의 유효성 확인, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.

2. 개인정보 파일 현황

3. 개인정보의 처리 및 보유 기간① <포브(Fov)>('아틔움')은(는) 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집시에 동의 받은 개인정보 보유,이용기간 내에서 개인정보를 처리,보유합니다.② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.

4. 개인정보의 제3자 제공에 관한 사항① <포브(Fov)>('www.artuium.com'이하 '아틔움')은(는) 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.

②

<포브(Fov)>('www.artuium.com')

은(는) 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.

1. <갤러리>- 개인정보를 제공받는 자 : 갤러리- 제공받는 자의 개인정보 이용목적 : 성별, 생년월일, 서비스 이용 기록- 제공받는 자의 보유.이용기간: 1년

5. 개인정보처리 위탁① <포브(Fov)>('아틔움')은(는) 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.

②

<포브(Fov)>('www.artuium.com'이하 '아틔움')

은(는) 위탁계약 체결시 개인정보 보호법 제25조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리․감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.

6. 정보주체와 법정대리인의 권리·의무 및 그 행사방법 이용자는 개인정보주체로써 다음과 같은 권리를 행사할 수 있습니다.

① 정보주체는 포브(Fov)에 대해 언제든지 개인정보 열람,정정,삭제,처리정지 요구 등의 권리를 행사할 수 있습니다.② 제1항에 따른 권리 행사는포브(Fov)에 대해 개인정보 보호법 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 포브(Fov)은(는) 이에 대해 지체 없이 조치하겠습니다.③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.④ 개인정보 열람 및 처리정지 요구는 개인정보보호법 제35조 제5항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.⑥ 포브(Fov)은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.

7. 처리하는 개인정보의 항목 작성① <포브(Fov)>('www.artuium.com'이하 '아틔움')은(는) 다음의 개인정보 항목을 처리하고 있습니다.

1<홈페이지 회원가입 및 관리>- 필수항목 : 이메일, 휴대전화번호, 로그인ID, 성별, 생년월일, 이름, 서비스 이용 기록, 접속 로그- 선택항목 :

8. 개인정보의 파기<포브(Fov)>('아틔움')은(는) 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.

-파기절차이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다. 이 때, DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다.-파기기한이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터 5일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를 파기합니다.

-파기방법종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.

9. 개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항

① 포브(Fov) 은 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠기(cookie)’를 사용합니다. ② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다. 가. 쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다. 나. 쿠키의 설치•운영 및 거부 : 웹브라우저 상단의 도구>인터넷 옵션>개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다. 다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.

10. 개인정보 보호책임자 작성

① 포브(Fov)(‘www.artuium.com’이하 ‘아틔움) 은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.

▶ 개인정보 보호책임자성명 :김푸른직책 :대표직급 :대표연락처 :01044563780, fov@artuium.com,※ 개인정보 보호 담당부서로 연결됩니다.▶ 개인정보 보호 담당부서부서명 :담당자 :연락처 :, ,② 정보주체께서는 포브(Fov)(‘www.artuium.com’이하 ‘아틔움) 의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 포브(Fov)(‘www.artuium.com’이하 ‘아틔움) 은(는) 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.

11. 개인정보 처리방침 변경

①이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.

12. 개인정보의 안전성 확보 조치 <포브(Fov)>('아틔움')은(는) 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.

1. 정기적인 자체 감사 실시개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체 감사를 실시하고 있습니다.2. 개인정보 취급 직원의 최소화 및 교육개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다.3. 개인정보의 암호화이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.4. 접속기록의 보관 및 위변조 방지개인정보처리시스템에 접속한 기록을 최소 6개월 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능 사용하고 있습니다.5. 개인정보에 대한 접근 제한개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.6. 문서보안을 위한 잠금장치 사용개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는 안전한 장소에 보관하고 있습니다.`}
                                </Text>
                            </ScrollView>
                            <TouchableOpacity
                                style={[styles.center, styles.mx5, styles.mt20, styles.loginShadow, isSubmitting ? styles.opacity07 : null, {backgroundColor: '#1162d0', height: 35, borderRadius: 5, width: 120}]}
                                onPress={this.props.handleChangeShowTerm}
                            >
                                <Text style={[styles.font16, styles.fontMedium, styles.white]}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    : showTerm2 ?
                        <View style={[styles.loginModal, styles.alignItemsCenter, styles.justifyContentCenter, styles.py15, {width: width-50}]}>
                            <Text style={[styles.fontBold, styles.font16, styles.textCenter]}>
                                '아틔움' 서비스이용약관
                            </Text>
                            <ScrollView style={[styles.px10, styles.py10, {height: height - 300}]} scrollEnabled={true}>
                                <Text style={[styles.fontMedium, styles.font12, styles.mb20]}>
                                    {`제 1장 총칙

제 1 조 (목적)

이 이용약관은 “포브(이하 "당 사이트")”에서 제공하는 아틔움(이하 '서비스')의 가입조건, 당 사이트와 이용자의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.

제 2 조 (용어의 정의)

1. "이용자"라 함은 당 사이트에 접속하여 이 약관에 따라 당 사이트가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.

2. "회원"이라 함은 서비스를 이용하기 위하여 당 사이트에 개인정보를 제공하여 아이디(ID)와 비밀번호를 부여 받은 자를 말합니다.

3. “비회원”이하 함은 회원으로 가입하지 않고 당 사이트에서 제공하는 서비스를 이용하는 자를 말합니다.

4. "회원 아이디(ID)"라 함은 회원의 식별 및 서비스 이용을 위하여 자신이 선정한 문자 및 숫자의 조합을 말합니다.

5. "비밀번호"라 함은 회원이 자신의 개인정보 및 직접 작성한 비공개 콘텐츠의 보호를 위하여 선정한 문자, 숫자 및 특수문자의 조합을 말합니다.

제 3 조 (이용약관의 효력 및 변경)

1. 당 사이트는 이 약관의 내용을 회원이 알 수 있도록 당 사이트의 초기 서비스화면에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.

2. 당 사이트는 이 약관을 개정할 경우에 적용일자 및 개정사유를 명시하여 현행 약관과 함께 당 사이트의 초기화면 또는 초기화면과의 연결화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 회원에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 당 사이트는 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다.

3. 당 사이트가 전항에 따라 개정약관을 공지하면서 “개정일자 적용 이전까지 회원이 명시적으로 거부의 의사표시를 하지 않는 경우 회원이 개정약관에 동의한 것으로 봅니다. ”라는 취지를 명확하게 공지하였음에도 회원이 명시적으로 거부의 의사표시를 하지 않은 경우에는 개정약관에 동의한 것으로 봅니다. 회원이 개정약관에 동의하지 않는 경우 당 사이트 이용계약을 해지할 수 있습니다.

제 4 조(약관 외 준칙)

1. 이 약관은 당 사이트가 제공하는 서비스에 관한 이용안내와 함께 적용됩니다.

2. 이 약관에 명시되지 아니한 사항은 관계법령의 규정이 적용됩니다.

제 2 장 이용계약의 체결

제 5 조 (이용계약의 성립 등)

이용계약은 이용고객이 당 사이트가 정한 약관에 「동의합니다」를 선택하고, 당 사이트가 정한 회원가입양식을 작성하여 서비스 이용을 신청한 후, 당 사이트가 이를 승낙함으로써 성립합니다.

제 6 조 (회원가입)

서비스를 이용하고자 하는 고객은 당 사이트에서 정한 회원가입양식에 개인정보를 기재하여 가입을 하여야 합니다.

제 7 조 (개인정보의 보호 및 사용)

당 사이트는 관계법령이 정하는 바에 따라 회원 등록정보를 포함한 회원의 개인정보를 보호하기 위해 노력합니다. 회원 개인정보의 보호 및 사용에 대해서는 관련법령 및 당 사이트의 개인정보 보호정책이 적용됩니다. 다만, 당 사이트 이외에 링크된 사이트에서는 당 사이트의 개인정보 보호정책이 적용되지 않습니다.

제 8 조 (이용 신청의 승낙과 제한)

1. 당 사이트는 제6조의 규정에 의한 이용신청고객에 대하여 약관에 정하는 바에 따라 서비스 이용을 승낙합니다.

2. 당 사이트는 아래사항에 해당하는 경우에 대해서 회원가입을 승낙하지 아니하거나 이후 사전 통보 없이 취소할 수 있습니다.- 회원가입 신청 시 내용을 허위로 기재한 경우- 기타 규정한 제반사항을 위반하며 신청하는 경우- 다른 사람의 당 사이트 이용을 방해하거나 그 정보를 도용하는 등의 행위를 하였을 경우- 당 사이트를 이용하여 법령과 본 약관이 금지하는 행위를 하는 경우

제 9 조 (회원 아이디 부여 및 변경 등)

1. 당 사이트는 이용고객에 대하여 약관에 정하는 바에 따라 자신이 선정한 회원 아이디를 부여합니다.

2. 회원 아이디는 원칙적으로 변경이 불가하며 부득이한 사유로 인하여 변경 하고자 하는 경우에는 해당 아이디를 해지하고 재가입해야 합니다.

3. 회원은 회원가입 시 기재한 개인정보가 변경되었을 경우 온라인으로 직접 수정할 수 있습니다. 이때 변경하지 않은 정보로 인해 발생되는 문제에 대한 책임은 회원에게 있습니다.

제 3 장 계약 당사자의 의무

제 10 조 ("포브"의 의무)

1. 당 사이트는 이용고객이 희망한 서비스 제공 개시일에 특별한 사정이 없는 한 서비스를 이용할 수 있도록 하여야 합니다.

2. 당 사이트는 개인정보 보호를 위해 보안시스템을 구축하며 개인정보 보호정책을 공시하고 준수합니다.

3. 당 사이트는 회원으로부터 제기되는 의견이 합당하다고 판단될 경우에는, 적절한 조치를 취하여야 합니다.

4. 당 사이트는 전시, 사변, 천재지변, 비상사태, 현재의 기술로는 해결이 불가능한 기술적 결함 기타 불가항력적 사유 및 이용자의 귀책사유로 인하여 발생한 이용자의 손해, 손실, 기타 모든 불이익에 대하여 어떠한 책임도 지지 않습니다.

제 11 조 (회원의 의무)

1. 이용자는 회원가입 신청 또는 회원정보 변경 시 실명으로 모든 사항을 사실에 근거하여 작성하여야 하며, 허위 또는 타인의 정보를 등록할 경우 일체의 권리를 주장할 수 없습니다.

2. 당 사이트가 관계법령 및 개인정보 보호정책에 의거하여 그 책임을 지는 경우를 제외하고, 회원에게 부여된 아이디의 비밀번호 관리소홀, 부정사용 등에 의하여 발생하는 모든 결과에 대한 책임은 회원에게 있습니다.

3. 회원은 당 사이트 및 제 3자의 지식재산권을 침해해서는 안 됩니다.

4. 이용자는 당 사이트의 운영자, 직원, 기타 관계자를 사칭하는 행위를 하여서는 안 됩니다.

5. 이용자는 바이러스, 악성코드 등을 제작, 배포, 이용하여서는 아니 되고, 당 사이트의 승인 없이 광고하는 행위를 하여서는 안 됩니다.

6. 이용자는 당 사이트 및 제 3자의 명예를 훼손하거나 업무를 방해하거나, 외설적이거나, 폭력적이거나 기타 공서양속에 반하는 게시물, 쪽지, 메일 등을 게시, 전송, 배포하여서는 안 됩니다.

제 4 장 서비스의 이용

제 12 조 (서비스 이용 시간)

1. 회원의 이용신청을 승낙한 때부터 서비스를 개시합니다. 단, 일부 서비스의 경우에는 지정된 일자부터 서비스를 개시합니다.

2. 업무상 또는 기술상의 장애로 인하여 서비스를 개시하지 못하는 경우에는 사이트에 공시하거나 회원에게 이를 통지합니다.

3. 서비스의 이용은 연중무휴, 1일 24시간을 원칙으로 하며, 서비스 응대 및 처리 시간은 법정 근무일 근무시간(09:00~18:00, 법정공휴일 및 주말 제외)으로 합니다. 다만, 당 사이트의 업무상 또는 기술상의 이유로 서비스가 일시 중지 될 수 있습니다. 이러한 경우 당 사이트는 사전 또는 사후에 이를 공지합니다.

4. 회원으로 가입한 이후라도 일부 서비스 이용 시 서비스 제공자의 요구에 따라 특정회원에게만 서비스를 제공할 수 있습니다.

5. 서비스를 일정 범위로 분할하여 각 범위별로 이용 가능 시간을 별도로 정할 수 있습니다. 이 경우 그 내용을 사전에 공개합니다.

제 13 조 (홈페이지 저작권)

1. 당 사이트가 게시한 본 홈페이지의 모든 콘텐트에 대한 저작권은 당 사이트에 있습니다. 다만, 게시물의 원저작자가 별도로 있는 경우 그 출처를 명시하며 해당 게시물의 저작권은 원저작자에게 있습니다.

2. 회원이 직접 게시한 저작물의 저작권은 회원에게 있습니다. 다만, 회원은 당 사이트에 무료로 이용할 수 있는 권리를 허락한 것으로 봅니다.

3. 당 사이트 소유의 콘텐츠에 대하여 제3자가 허락 없이 다른 홈페이지에 사용 또는 인용하는 것을 금지합니다.

제 14 조 (서비스의 변경, 중단)

1. 당 사이트는 기술상•운영상의 필요에 의해 제공하는 서비스의 일부 또는 전부를 변경하거나 중단할 수 있습니다. 당 사이트의 서비스를 중단하는 경우에는 30일 전에 홈페이지에 이를 공지하되, 다만 사전에 통지할 수 없는 부득이한 사정이 있는 경우는 사후에 통지를 할 수 있습니다.

2. 제1항의 경우에 당 사이트가 제공하는 서비스의 이용과 관련하여, 당 사이트는 이용자에게 발생한 어떠한 손해에 대해서도 책임을 지지 않습니다. 다만 당 사이트의 고의 또는 중대한 과실로 인하여 발생한 손해의 경우는 제외합니다.

제 5 장 계약 해지 및 이용 제한

제 15 조 (계약 해지)

1. 회원은 언제든지 마이페이지 메뉴 등을 통하여 이용계약 해지 신청을 할 수 있으며, 당 사이트는 관련법 등이 정하는 바에 따라 이를 즉시 처리하여야 합니다.

2. 회원이 계약을 해지할 경우, 관련법령 및 개인정보처리방침에 따라 당 사이트가 회원정보를 보유하는 경우를 제외하고는 해지 즉시 회원의 모든 데이터는 소멸됩니다.

3. 회원이 계약을 해지하는 경우, 회원이 작성한 게시물(공용게시판에 등록된 게시물 등)은 삭제되지 아니합니다.

제 16 조 (서비스 이용제한)

1. 당 사이트는 회원이 서비스 이용에 있어서 본 약관 및 관련 법령을 위반하거나, 다음 각 호에 해당하는 경우 서비스 이용을 제한할 수 있습니다.- 2년 이상 서비스를 이용한 적이 없는 경우- 기타 정상적인 서비스 운영에 방해가 될 경우

2. 상기 이용제한 규정에 따라 서비스를 이용하는 회원에게 사전 통지 후 서비스 이용을 일시정지 등 제한하거나 이용계약을 해지 할 수 있습니다. 단, 불가피한 사유로 사전 통지가 불가능한 경우에는 그러하지 아니합니다.

제 6 장 손해배상 및 기타사항

제 17 조 (손해배상)

당 사이트는 무료로 제공되는 서비스와 관련하여 회원에게 어떠한 손해가 발생하더라도 당 사이트가 고의 또는 과실로 인한 손해발생을 제외하고는 이에 대하여 책임을 부담하지 아니합니다.

제 18 조 (관할 법원)

서비스 이용으로 발생한 분쟁에 대해 소송이 제기되는 경우 민사 소송법상의 관할 법원에 제기합니다.

제 19 조 (서비스별 이용자 사전 동의 사항과 의무)

당 사이트에 ‘기술정보를 제공하는 이용자는 자신의 기술정보에 대한 권리(특허권, 실용신안권, 디자인권, 상표권 등)를 법적으로 보호받기 위해서 필요한 조치를 스스로 취하여야 합니다. 당 사이트는 이용자의 권리 보장이나 취득 등을 위한 어떠한 명목의 의무나 책임도 부담하지 않고, 이를 보장하지 않으며, 이용자 개인의 행위(당 사이트의 서비스 이용 행위 일체를 포함)로 인한 어떠한 분쟁이나 어떠한 명목의 손실, 손해에 대해서도 법적 책임을 지지 아니합니다.

제 7 장 "아틔움" 게시물 운영정책

제 20 조 (운영정책)

"아틔움" 각종 게시물에 대한 운영정책은 방송통신심의위원회의 정보통신에 관한 심의규정에 기반하며 이를 위반할 경우, "아틔움" 운영정책에 의해 관련 게시물은 예고 없이 삭제, 이동될 수 있으며, 게시자(회원)는 아이디 이용제한 등 "아틔움" 이용에 제한을 받을 수 있습니다.

제 21 조 (게시물 등록)

게시물은 실명을 통해 등록합니다. 악성 글 등을 업로드 하실 경우 게시물 삭제 또는 게시자(회원)의 이용제한 등의 경고 조치가 가능합니다.

1. 주민등록번호 도용 타인의 개인정보를 이용한 활동이 발견될 경우, 해당 회원은 이용에 제한을 받을 수 있으며, 해당 계정은 본인인증 후에 정상적인 이용이 가능합니다. 또한 여러 개의 아이디를 생성하여 허위신고를 하거나, 타인 사칭을 통한 문제 발생 시, 그에 따른 이용 제한을 받을 수 있습니다.

제 22 조 (게시물의 저작권)

1. 게시물은 회원이 서비스를 이용하면서 게재한 글, 사진, 파일, 관련 링크 및 댓글 등을 말합니다.

2. 회원이 서비스에 등록하는 게시물로 인하여 본인 또는 타인에게 손해 및 기타 문제가 발생하는 경우, 회원은 이에 대한 책임을 질수 있으며 또한 명예훼손이나 개인정보 유출, 저작권과 같은 법률에 위배되는 게시물 및 댓글은 관련 법안에 따라 민형사상 처벌을 받을 수 있으니 이 점 유의하여 주시기 바랍니다.

제 23 조 (게시물 제한규정(삭제 및 이동)

1. 욕설/비속어 및 분란을 조장하는 게시물- 욕설 및 비속어가 담겨있거나, 연상시키는 내용- 이유 없이 회원 간의 분란을 발생시킬 여지가 있는 내용의 게시물 또는 댓글

2. 게시판 및 자료실과 관련 없는 게시물- 각 주제 분야별로 나뉘어 있는 게시판 및 자료실의 주제와 관련 없는 내용

3. 상업성 광고 및 홍보 글에 관한 게시물

4. 개인정보의 유포에 관한 게시물- 타인, 혹은 본인의 메일주소/실명/사진/전화번호/주민등록번호 등의 개인정보 또는 해당 정보가 담겨 있는 내용

5. 확인되지 않은 소문의 유포에 관한 게시물- 공개되었을 경우, 당사자의 권리침해가 우려되는 내용

6. 정치적 견해 차이 및 인종/성별/지역/종교에 대한 차별, 비하하는 게시물- 인종/성별/지역/종교에 대한 차별적 발언 또는 비하하는 내용- 상이한 정치적 견해를 비하하거나 폄하하는 내용

7. 타인을 사칭하거나 범죄행위에 관한 게시물- 공인이나 특정 이슈와 관련한 당사자 또는 지인, 주변인 등을 사칭하여 게시물을 작성하거나, "아틔움" 운영자를 사칭하여 작성된 내용- 범죄와 관련 있거나 범죄를 유도하는 행위를 포함하는 내용

8. 악성코드/스파이웨어/혐오감 조성에 관한 게시물- 악성코드 및 스파이웨어의 유포 및 유도 관련 게시물은 사전경고 없이 제재를 받을 수 있습니다.- 시각 및 청각적으로 타인에게 혐오감을 줄 수 있는 게시물은 사전경고 없이 제재를 받을 수 있습니다.10. 기타 서비스 운영에 지장을 초래할 수 있는 게시물

제 24 조 (이용제한)

1. 게시물 제한규정(3조)에 해당하는 내용을 게재하는 경우

2. 다량의 게시물 등록을 목적으로 의미 없는 제목을 사용하거나, 반복되는 제목을 사용하여 게재하는 경우

3. 비정상적인 방법으로 게시물을 등록, 조회 및 추천하는 경우 등

제 25 조 (게시중단 요청 서비스)

다른 회원의 게시물로 인하여 명예훼손, 저작권 침해 등의 피해를 입었을 경우, 운영 담당자를 통해 해당 게시물에 대한 게시 중단을 요청하실 수 있습니다.

[부 칙]

(시행일) 이 약관은 2020년 1월 18일부터 적용되며, 종전 약관은 본 약관으로 대체되며, 개정된 약관의 적용일 이전 가입자도 개정된 약관의 적용을 받습니다.`}
                                </Text>
                            </ScrollView>
                            <TouchableOpacity
                                style={[styles.center, styles.mx5, styles.mt20, styles.loginShadow, isSubmitting ? styles.opacity07 : null, {backgroundColor: '#1162d0', height: 35, borderRadius: 5, width: 120}]}
                                onPress={this.props.handleChangeShowTerm2}
                            >
                                <Text style={[styles.font16, styles.fontMedium, styles.white]}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    :
                        <View style={[styles.loginModal, styles.alignItemsCenter, styles.py15, {width: width-50}]}>
                            <Text style={[styles.font21, styles.fontMedium]}>프로필 작성</Text>
                            <View style={[styles.justifyContentBetween, styles.alignItemsCenter, {width: width-50}]}> 
                                <TouchableWithoutFeedback onPress={()=>this.props.handleChangeProfileImg()}>
                                    {this.props.profileImg ?
                                        <Image source={{uri: this.props.profileImg.uri}} style={[styles.mt30, {width: 100, height: 100, borderRadius: 50}]} />
                                    :
                                        <Image source={require('../../assets/images/empty_profile.png')} style={[styles.mt30, {width: 100, height: 100, borderRadius: 50}]} />
                                    }
                                </TouchableWithoutFeedback>
                                <View style={[styles.my15, styles.px15, {width: '100%'}]}>
                                    <View style={[styles.row, styles.justifyContentBetween, styles.px5, styles.alignItemsCenter, {height: 40}]}>
                                        <View style={[styles.row, styles.pl5, styles.alignItemsCenter, {width: '100%', height: 40, borderBottomWidth: 1, borderBottomColor: '#b2b2b2'}]}>
                                            <TextInput
                                                style={[styles.font14, styles.black, {height: 43, width: '80%'}]}
                                                placeholder={'닉네임을 입력해주세요'}
                                                autoCapitalize={'none'} 
                                                autoCorrect={false} 
                                                value={this.props.nickname} 
                                                onChangeText={this.props.handleNicknameChange} 
                                                returnKeyType={'next'} 
                                                placeholderTextColor={'#b2b2b2'}
                                            />
                                            <TouchableOpacity style={[styles.smBlueBtn, isCheckingNickname ? styles.opacity07 : null]} onPress={this.props.handleCheckNickname}>
                                                <Text style={[styles.fontMedium, styles.font10, {color: '#044ae6'}]}>중복확인</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.alignSelfCenter]}>
                                    <TouchableWithoutFeedback onPress={this.props.handleChangeAgreeTerm}>
                                        <View style={[styles.row, styles.alignItemsCenter, styles.mt10]}>
                                            <View style={[styles.borderRadius3, styles.alignItemsCenter, styles.justifyContentCenter, styles.bgWhite, styles.loginShadow, { width: 20, height: 20 }]}>
                                                {agreeTerm && (
                                                    <View style={[styles.borderRadius3, styles.bgBlue, { width: 12, height: 12 }]}></View>
                                                )}
                                            </View>
                                            <Text style={[styles.fontMedium, styles.font13, styles.ml15]}>
                                                <TouchableWithoutFeedback onPress={this.props.handleChangeShowTerm}>
                                                    <Text style={[styles.fontBold, styles.font13, styles.blue, { zIndex: 99 }]}>
                                                        개인정보처리방침
                                                    </Text>
                                                </TouchableWithoutFeedback>
                                                에 동의합니다.
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={this.props.handleChangeAgreeTerm2}>
                                        <View style={[styles.row, styles.alignItemsCenter, styles.mt10]}>
                                            <View style={[styles.borderRadius3, styles.alignItemsCenter, styles.justifyContentCenter, styles.bgWhite, styles.loginShadow, { width: 20, height: 20 }]}>
                                                {agreeTerm2 && (
                                                    <View style={[styles.borderRadius3, styles.bgBlue, { width: 12, height: 12 }]}></View>
                                                )}
                                            </View>
                                            <Text style={[styles.fontMedium, styles.font13, styles.ml15]}>
                                                <TouchableWithoutFeedback onPress={this.props.handleChangeShowTerm2}>
                                                    <Text style={[styles.fontBold, styles.font13, styles.blue, { zIndex: 99 }]}>
                                                        서비스이용약관
                                                    </Text>
                                                </TouchableWithoutFeedback>
                                                에 동의합니다.
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={this.props.handleChangeAgreeAll}>
                                        <View style={[styles.row, styles.alignItemsCenter, styles.mt10]}>
                                            <View style={[styles.borderRadius3, styles.alignItemsCenter, styles.justifyContentCenter, styles.bgWhite, styles.loginShadow, { width: 20, height: 20 }]}>
                                                {agreeAll && (
                                                    <View style={[styles.borderRadius3, styles.bgBlue, { width: 12, height: 12 }]}></View>
                                                )}
                                            </View>
                                            <Text style={[styles.fontMedium, styles.font13, styles.ml15]}>
                                                전체 동의합니다.
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={[styles.row]}>
                                    {this.props.checkedNickname && this.props.nicknameForm && this.props.agreeAll ? 
                                    <TouchableOpacity
                                        style={[styles.center, styles.mx5, styles.loginShadow, styles.my30, isSubmitting ? styles.opacity07 : null, {backgroundColor: '#1162d0', height: 35, borderRadius: 5, width: 120}]}
                                        onPress={this.props.addInfoEnd}
                                    >
                                        <Text style={[styles.font16, styles.fontMedium, styles.white]}>입장하기</Text>
                                    </TouchableOpacity>
                                    :
                                    <View
                                        style={[styles.center, styles.mx5, styles.loginShadow, styles.my30, isSubmitting ? styles.opacity07 : null, {backgroundColor: '#bdbdbd', height: 35, borderRadius: 5, width: 120}]}
                                    >
                                        <Text style={[styles.font16, styles.fontMedium, styles.white]}>입장하기</Text>
                                    </View>
                                    }
                                </View>
                            </View>
                        </View>
                    }
                </Modal>
                <View>
                    <Text style={[styles.font20, styles.fontMedium, styles.textCenter]}>
                        예술을 이야기하다
                    </Text>
                    <Image source={require('../../assets/images/logo_with_text.png')} style={[{width: 1324*0.05, height: 1536*0.05}, styles.mt15, styles.alignSelfCenter, {marginBottom: 100}]} />
                    <View style={[styles.alignItemsCenter]}>
                        <TouchableWithoutFeedback onPress={()=>this.props.handleKakaoLogin()}>
                            <View>
                                <Image source={require('../../assets/images/login_kakao.png')} style={[styles.loginBtn]} resizeMode={'contain'} />
                            </View>
                        </TouchableWithoutFeedback>
                        {Platform.OS === 'ios' ?
                            <TouchableWithoutFeedback onPress={this.props.handleGoogleLogin}>
                                <View style={[styles.loginBtn, styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px20, styles.mt25, { backgroundColor: '#fff', borderRadius: 3 }]}>
                                    <Image source={require('../../assets/images/logo_google.png')} style={[{width: 30, height: 30}, styles.alignSelfCenter]} />
                                    <Text style={[styles.fontBold, styles.font14, styles.textCenter, {marginRight: 35, opacity: 0.54}]}>Google 계정으로 로그인</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        :
                            <GoogleSigninButton
                                style={[styles.mt25, { width: 308, height: 58 }]}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Light}
                                onPress={()=>this.props.handleGoogleLogin()}
                            />
                        }
                        <TouchableWithoutFeedback onPress={this._handleFacebookLogin}>
                            <View style={[styles.loginBtn, styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px20, styles.mt25, { backgroundColor: '#3B77EA', borderRadius: 3 }]}>
                                <Image source={require('../../assets/images/logo_fb.png')} style={[{width: 30, height: 30}, styles.alignSelfCenter]} />
                                <Text style={[styles.white, styles.fontBold, styles.font14, styles.textCenter, {marginRight: 35}]}>Facebook으로 계속하기</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        {Platform.OS === 'ios' ?
                        <AppleButton
                            style={[styles.mt25, {width: 300, height: 48}]}
                            cornerRadius={5}
                            buttonStyle={AppleButton.Style.BLACK}
                            buttonType={AppleButton.Type.SIGN_IN}
                            onPress={() => this.props.handleAppleSignIn()}
                        />
                        :
                        null}
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

export default LoginScreen;