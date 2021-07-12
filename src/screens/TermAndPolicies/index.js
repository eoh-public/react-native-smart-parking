/* eslint-disable max-len */
import React, { memo, useMemo } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { t } from 'i18n-js';
import Text from '../../commons/Text';
import { Colors } from '../../configs';
import { TESTID } from '../../configs/Constants';

const TermAndPolicies = memo(({ scrollViewStyle }) => {
  const data = useMemo(
    () => [
      {
        id: 0,
        title: '',
        content:
          'Điều kiện giao dịch chung này được lập bởi CÔNG TY CỔ PHẦN EOH (EoH), ' +
          'áp dụng đối với tất cả người dùng ứng dụng EoH.  ' +
          'Người dùng vui lòng đọc kỹ các điều khoản này trước khi thực hiện các giao dịch trên app. ' +
          'Nếu bạn không đồng ý với Điều khoản sử dụng của chúng tôi, hãy ngưng kết nối và sử dụng ứng dụng này.',
      },
      {
        id: 1,
        title: '1. Giới thiệu về app',
        content:
          'EoH là ứng dụng thuộc quản lý của CÔNG TY CỔ PHẦN EOH ' +
          'có địa chỉ tại sô 298/3 đường Điện Biên Phủ, Phường 17, quân Bình Thạnh, thành phố Hồ Chí Minh. ' +
          'Ứng dụng được thiết lập nhằm mục đích cung ứng dịch vụ tìm chỗ đỗ xe ô tô thông minh cho người dùng. ' +
          'Ứng dụng cung cấp cho khách hàng thông tin về các bãi đỗ xe còn trống ' +
          'quanh khu vực bạn sẽ tới hoặc đang ở gần, ' +
          'cung cấp dịch vụ đặt chỗ trước để giữ chỗ đỗ xe trong khung thời gian mong muốn. ' +
          'Thông qua ứng dụng này, người dùng có thể dễ dàng tìm kiếm bãi đỗ xe phù hợp tại các khu vực thành phố lớn. ',
      },
      {
        id: 2,
        title: '2. Các điều kiện hoặc hạn chế:',
        content:
          'EoH cung cấp dịch vụ trong phạm vi toàn bộ lãnh thổ Việt Nam. ' +
          'Đối tượng khách hàng hướng tới cả cá nhân và tổ chức, doanh nghiệp người đang sử dụng xe ô tô ' +
          'và có nhu câu tìm kiếm bãi đỗ xe. ' +
          'Không có bất cứ giới hạn cung cấp dịch vụ nào ngoại trừ việc ' +
          'khách hàng sử dụng dịch vụ của chúng tôi cho mục đích vi phạm pháp luật. ',
      },
      {
        id: 3,
        title: '3. Đặt hàng trực tuyến',
        content:
          'Ứng dụng cung cấp cho khách hàng chứng năng đăt chỗ đỗ xe ô tô trực tuyến. ' +
          'Khi mở ứng dụng, một bản đồ vị trí sẽ xuất hiện và hiển thị các vị trí đỗ xe. ' +
          'Khách hàng có thể lựa chọn một vị trí đỗ xe, kiểm tra số chỗ còn trống, ' +
          'giá cước đỗ xe và tiến hành đặt chỗ cho thời gian sử dụng. ' +
          'Sau khi hoàn thành việc đặt chỗ, thông tin đặt chỗ sẽ được gửi tới đơn vị quản lý bãi đỗ xe để cập nhật. ' +
          'Quý khách có trách nhiệm tới bãi đỗ trong khung giờ đặt. ' +
          'Phí dịch vụ sẽ được tính từ thời điểm quý khách đặt chỗ ngay cả khi xe chưa vào bãi ' +
          'cho tới khi xe được lấy ra khỏi bãi. \n' +
          'Thời gian sẽ được làm tròn tới khung giờ kế tiếp với mỗi khung cách nhau 30 phút.',
      },
      {
        id: 4,
        title: '4. Chính sách về hoàn trả',
        content:
          'Khách hàng có thể từ chối đỗ xe khi vị trí đỗ xe không đủ điều kiện để đỗ xe, ' +
          'có khả năng gây hư hỏng xe.\n' +
          'Khách hàng có quyền hủy đặt chỗ đỗ xe trước giờ đặt chỗ tối thiểu 30 phút.',
      },
      {
        id: 5,
        title: '5. Bảo vệ xe tại bãi đỗ',
        content:
          'EoH và chủ bãi đỗ xe có trách nhiệm bảo vệ giữ cho xe ở trạng thái tốt như trước khi vào bãi. ' +
          'Ngoại trừ những yếu tố về tự nhiên, thời tiết như bụi, nắng, mưa ' +
          'thì các hư hỏng mất mát xảy ra trong quá trình đỗ xe ' +
          'sẽ được EoH và Chủ bãi đỗ xe xem xét bổi thường theo yêu cầu phù hợp.',
      },
      {
        id: 6,
        title: '6. Tiêu chuẩn dịch vụ',
        content:
          'EoH luôn mong muốn mang tới cho khách hàng dịch vụ tốt nhất, ' +
          'chúng tôi luôn đặt yêu cầu của khách hàng lên hàng đầu và các tiêu chuẩn dịch vụ ' +
          'hướng tới phải đảm bảo sự hành lòng của khách hàng. ' +
          'Bãi đỗ xe được đề xuất phải ở trong tình trạng đảm bảo an ninh, có người trông coi, ' +
          'có thể ra vào thuận tiện và hạn chế tối đa các tác động từ môi trường.',
      },
      {
        id: 7,
        title: '7. Quy trình cung cấp dịch vụ',
        content:
          'Sau khi quý khách đã đăt chỗ đỗ xe, xe có thể đến bãi theo thời gian đặt trước và sử dụng dich vụ.',
      },
      {
        id: 8,
        title: '8. Quyền, trách nhiệm và nghĩa vụ của EoH',
        content:
          '- Chịu trách nhiệm thông báo Ứng dụng thương mại điện tử bán hàng ' +
          'này tới Bộ Công Thương theo quy định. \n' +
          '- Chịu trách nhiệm cung cấp thông tin đầy đủ, trung thực và không vi phạm pháp luật trên ứng dụng này. \n' +
          '- Có quyền và có trách nhiệm thông báo cho khách hàng về việc thay đổi chính sách, ' +
          'điều khoản, điều kiện giao dịch trên website.\n' +
          '- Chịu trách nhiệm về dịch vụ được cung cấp.',
      },
      {
        id: 9,
        title: '9. Quyền, trách nhiệm, và nghĩa vụ của Khách hàng',
        content:
          '- Truy cập, tham khảo và sử dụng thông tin công khai trên ứng dụng ' +
          'nhằm mục đích không vi phạm pháp luật.\n' +
          '- Không được thực hiện hành vi xâm phạm quyền sở hữu trí tuệ bao gồm những không giới hạn ở thương hiệu, ' +
          'nhãn hiệu, bản quyền và các đối tượng sở hữu trí tuệ khác theo quy định của Luật sở hữu trí tuệ Việt Nam ' +
          'hiện hành. Khi có yêu cầu từ EoH, khách hàng phải ngay lập tức chấm dứt hành vi vi phạm của mình.\n' +
          '- Nghĩa vụ cung cấp chính xác, đầy đủ thông tin cho EoH ' +
          'để làm căn cứ cung cấp dịch vụ một cách nhanh chóng và chính xác nhất.',
      },
      {
        id: 10,
        title: '10. Điều khoản khác',
        content:
          'Điều kiện giao dịch chung này được điều chỉnh bởi pháp luật Việt Nam. ' +
          'Điều kiện giao dịch chung này có giá trị đối với những khách hàng đang tìm hiểu về dịch vụ của EoH ' +
          'cung cấp trên ứng dụng này, sau khi quý khách chính thức ký kết hợp đồng cung cấp dịch vụ với EoH, ' +
          'những nội dung trên Hợp đồng dịch vụ là văn bản điều chỉnh mối quan hệ giữa hai bên.\n' +
          'Nếu bất kỳ điều khoản nào ở trên bị vô hiệu, ' +
          'quy định pháp luật tại thời điểm đó sẽ được áp dụng để điều chỉnh. ' +
          'Một điều khoản sử dụng bị vô hiệu sẽ không ảnh hưởng đến hiệu lực của các điều khoản còn lại. \n' +
          'EoH có quyền, và có thể phát hành những điều chỉnh bất cứ thời điểm nào bằng cách cập nhật lên ứng dụng.',
      },
    ],
    []
  );

  const policiesData = useMemo(
    () => [
      {
        id: 1,
        title: '1. Chính sách bảo mật',
        content:
          'a) Mục đích thu thập thông tin cá nhân:\n' +
          'Để truy cập và sử dụng dịch vụ tại app của EoH, ' +
          'Khách hàng phải thực hiện việc đăng ký thông tin tài khoản. ' +
          'Quý khách sẽ phải điền thông tin cá nhân và thông tin liên hệ để thực hiện việc đăng ký tài khoản này.\n' +
          'Các thông tin cần điền bao gồm: Họ tên, Email, Số điện thoại liên lạc do khách tự cung cấp. ' +
          'EoH sẽ thu thập những thông tin này nhằm mục đích liên hệ với khách hàng để hỗ trợ khách hàng' +
          ' trong quá trình sử dụng dịch vụ trên app và giải quyết các khiếu nại tranh chấp phát sinh. ' +
          'Chúng tôi sẽ không sử dụng những thông tin đó để gửi quảng cáo, ' +
          'giới thiệu sản phẩm và các thông tin có tính thương mại khác.\n' +
          'Chúng tôi cũng có thể thu thập thông tin về biển số xe o tô, số chỗ trên xe, hình ảnh của xe, ' +
          'lịch sử đặt chỗ, các vi phạm, thói quen sử dụng để cải thiện trải nghiệm của quý khách.\n' +
          'Quý khách phải chấp nhận toàn bộ nội dung chính sách này trước khi sử dụng app.\n\n' +
          'b) Phạm vi sử dụng thông tin:\n' +
          'EoH sử dụng thông tin trong phạm vi các phòng ban và cá nhân thuộc ' +
          'EoH và hoàn toàn tuân thủ quy định pháp luật.\n' +
          'Khi cần thiết, chúng tôi có thể sử dụng những thông tin này để liên hệ trực tiếp với Khách hàng để hỗ trợ' +
          ' khách hàng trong quá trình sử dụng dịch vụ trên app và giải quyết các khiếu nại tranh chấp phát sinh' +
          ' dưới các hình thức như: gởi thư ngỏ, thư cảm ơn, sms, thông tin về kỹ thuật và bảo mật.\n\n' +
          'c) Thời gian lưu trữ thông tin:\n' +
          'Dữ liệu cá nhân của Thành viên sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ từ khách hàng. ' +
          'Còn lại trong mọi trường hợp thông tin cá nhân thành viên sẽ được bảo mật trên máy chủ EOH.\n\n' +
          'd) Tiếp cận\n' +
          'Chỉ có nhân viên của EoH, ' +
          'thực hiện công việc được giao mới được phép tiếp cận tới thông tin của khách hàng.\n\n' +
          'e) Địa chỉ của đơn vị thu thập và quản lý thông tin:\n' +
          'CÔNG TY CỔ PHẦN EOH\n' +
          'Địa chỉ: 298/3 Điện Biên Phủ, Phường 17, Quận Bình Thạnh, Thành phố Hồ Chí Minh.\n' +
          'MST: 0316384747\n' +
          'Hotline: (028) 71 004 747' +
          'Email: info@eoh.io\n' +
          'Quý khách có thể liên lạc theo thông tin trên để hỏi về hoạt động thu thập, ' +
          'xử lý thông tin liên quan đến cá nhân mình.\n\n' +
          'g) Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân:\n' +
          'Hiện chúng tôi chưa triển khai trang quản lý thông tin cá nhân của thành viên vì thế việc tiếp cận' +
          ' và chỉnh sửa dữ liệu cá nhân dựa vào yêu cầu của khách hàng bằng cách hình thức sau:\n' +
          'Gửi email vào địa chỉ support@eoh.io hoặc số điện thoại (028) 71 004 747' +
          ' để gặp nhân viên sẽ hỗ trợ chỉnh sửa thay người dùng.\n\n' +
          'f) Cam kết bảo mật thông tin cá nhân khách hàng:\n' +
          'Thông tin cá nhân của thành viên được EoH cam kết bảo mật tuyệt đối theo chính sách bảo vệ' +
          ' thông tin cá nhân của EoH và theo quy định pháp luật. ' +
          'Việc thu thập và sử dụng thông tin của mỗi thành viên chỉ được thực hiện khi có sự đồng ý của khách hàng' +
          ' đó trừ những trường hợp pháp luật có quy định khác.\n' +
          'Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào về thông tin cá nhân' +
          ' của thành viên khi không có sự cho phép đồng ý từ thành viên.\n' +
          'Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân thành viên,' +
          ' EOH sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng' +
          ' điều tra xử lý kịp thời và thông báo cho thành viên được biết.\n' +
          'Bảo mật tuyệt đối mọi thông tin giao dịch trực tuyến của Thành viên bao gồm thông tin hóa đơn kế toán' +
          ' chứng từ số hóa tại khu vực dữ liệu trung tâm an toàn cấp 1 của EOH.\n' +
          'Ban quản lý EOH yêu cầu các cá nhân khi đăng ký/sử dụng dịch vụ là thành viên, ' +
          'phải cung cấp đầy đủ và đúng thông tin cá nhân có liên quan như: Họ và tên, địa chỉ liên lạc, email, ' +
          'số chứng minh nhân dân, điện thoại và chịu trách nhiệm về tính pháp lý của những thông tin trên. ' +
          'Ban quản lý EOH không chịu trách nhiệm cũng như không giải quyết mọi khiếu nại có liên quan đến quyền lợi' +
          ' của Thành viên đó nếu xét thấy tất cả thông tin cá nhân của thành viên' +
          ' đó cung cấp khi đăng ký ban đầu là không chính xác.\n' +
          'Trong trường hợp hệ thống thông tin bị tấn công làm phát sinh nguy cơ mất thông tin của người dùng, ' +
          'EoH phải thông báo cho cơ quan chức năng trong vòng 24 (hai mươi bốn) giờ sau khi phát hiện sự cố.\n\n' +
          'g) Phản ánh và giải quyết khiếu nại\n' +
          'Trong trường hợp phát hiện viêc sử dụng thông tin bị vi phạm, ' +
          'người dùng tiến hành phản ánh bằng cách goi điện, ' +
          'gửi email hoặc trực tiếp tới chúng tôi theo thông tin dưới đây:\n' +
          '\t - CÔNG TY CỔ PHẦN EOH\n' +
          '\t - Địa chỉ: 298/3 Điện Biên Phủ, Phường 17, Quận Bình Thạnh, Thành phố Hồ Chí Minh.\n' +
          '\t - Hotline: (028) 71 004 747.\n' +
          '\t - Email: info@eoh.io\n' +
          'Mọi khiếu nại sẽ được giải quyết trong thời gian sớm nhất và không quá 7 ngày làm việc.\n' +
          'Khi có căn cứ xác định khiếu nại là có cở sở, ' +
          'chúng tôi sẽ ngay lập tức thực hiện các biện pháp ngăn chặn hành vi vi phạm, ' +
          'phản hồi tới quý khách và xử lý hành vi vi phạm theo quy định pháp luật.\n',
      },
      {
        id: 2,
        title: '2. Chính sách thanh toán',
        content:
          'Quý khách hàng khi sử dụng dịch vụ của chúng tôi có trách nhiệm thanh toán phí dịch vụ' +
          ' dựa trên số lượng dịch vụ sử dụng. \n' +
          'Khi đã chọn được thông tin đỗ xe phù hợp, ' +
          'quý khách phải lựa chọn thời gian thanh toán là một trong hai phương án sau:\n' +
          '\t - Thanh toán trước: quý khách sẽ thanh toán phí đỗ xe trước khi xe vào chỗ đỗ. ' +
          'Đặt chỗ của bạn sẽ được đảm bảo. Tuy nhiên trong trường hợp bạn muốn hủy đặt chỗ, ' +
          'bạn sẽ mất phí đã thanh toán. Việc dặt chỗ sẽ chỉ hoàn thành sau khi quý khách thực hiện thanh toán.\n' +
          '\t - Thanh toán sau: bạn có thể đặt chỗ mà không cần thanh toán trước và ' +
          'chỉ cần thanh toán trước thời điểm được thông báo trong phần thông tin đặt chỗ. ' +
          'Sau khoảng thời gian này, mã đặt chỗ của bạn sẽ bị hủy tự động bởi hệ thống nếu không được thanh toán. ' +
          'Sau khi hoàn thành việc đặt chỗ, trước thời hạn thanh toán, ' +
          'quý khách cần đăng nhập vào ứng dụng và tiến hành bấm vào thanh toán và' +
          ' thực hiện việc thanh toán để giữ lại đơn đặt chỗ.\n\n' +
          'Với mong muốn mang đến cho quý khách trải nghiệm tốt nhất, ' +
          'khi sử dụng dịch vụ, quý khách có quyền lựa chọn những một trong các phương thức thanh toán như sau:\n\n' +
          '\t 1. Thanh toán qua thẻ Visa/Master\n' +
          '\t Sau khi chọn phương thức thanh toán này. ' +
          'Ứng dụng sẽ chuyển tới cửa sổ mới để bạn điện thông tin thẻ hoặc sẽ chọn thẻ mặc định' +
          ' đã được lưu thông tin trên ứng dụng để thực hiện việc thanh toán tự động sau khi xác nhận đặt chỗ.\n\n' +
          '\t 2. Thanh toán thông qua VnPay. \n' +
          '\t Ở phương thức này, quý khách có thể thực hiện thanh toán qua các cách với hướng dẫn như sau:\n\n' +
          '\t 2.1. Thanh toán qua cổng thanh toán VNPay QR. \n' +
          '\t Hướng dẫn thực hiện:\n' +
          '\t Bước 1: Sau khi lựa chọn thanh toán trên ứng dụng, ' +
          'quý khách sẽ được chuyển tới cửa sổ để chọn phương thức thanh toán. ' +
          'Tại đây, các cách thanh toán được chấp nhận sẽ hiện thị để khách hàng lựa chọn. ' +
          'Quý khách chọn “Thanh toán qua ứng dụng hỗ trợ VNPAYQR”\n' +
          '\t Bước 2: Cửa sổ mới mở ra hiện thị những logo của các ứng dụng ngân hàng hoặc ví điện tử được chấp nhận. ' +
          'Quý khách nhấn vào logo của ngân hàng hoặc ví điện tử mong muốn trong danh sách. ' +
          'Thông báo về việc mở ứng dụng ngân hàng hoặc ví điện tử hiện lên' +
          ' để điều hướng quý khách sử dụng ứng dụng đó.\n' +
          'Điều kiện: Ứng dụng của ngân hàng hoặc ví điện tử đó đã được cài đặt sẵn trên điện thoại của quý khách\n' +
          '\t Bước 3: Quý khách đồng ý mở ứng dụng ngân hàng hoặc ví điện tử, ' +
          'thực hiện đăng nhập và thực hiện việc thanh toán phí dịch vụ trên ứng dụng này.\n' +
          '\t Bước 4: Xác nhận giao dịch và hoàn tất việc thanh toán.\n\n' +
          '\t 2.2. Thanh toán quét mã VNPAYQR\n' +
          '\t Hướng dẫn thực hiện:\n' +
          '\t Bước 1: Sau khi lựa chọn thanh toán trên ứng dụng, ' +
          'quý khách sẽ được chuyển tới cửa sổ để chọn phương thức thanh toán. ' +
          'Tại đây, các cách thanh toán được chấp nhận sẽ hiện thị để khách hàng lựa chọn. ' +
          'Quý khách chọn “Thanh toán quét mã VNPAYQR”\n' +
          '\t Bước 2: Cửa sổ mới mở ra, thông tin về số tiền thanh toán và mã VNPAYQR xuất hiện.\n' +
          '\t Bước 3: \n' +
          '\t Cách 1: Quý khách thanh toán bằng cách mở ứng dụng ngân hàng hoặc ứng dụng ví điện tử trên thiết bị khác, ' +
          'sử dụng tính năng thanh toán qua mã QR trên ứng dụng này và quét lên mã VNPAY QR trong ứng dụng EoH, ' +
          'tiến hành thao tác đồng ý thanh toán trên ứng dụng đó.\n' +
          '\t Cách 2: Quý khách tải mã VNPAY QR về điện thoại, ' +
          'sau đó mở mở ứng dụng ngân hàng hoặc ứng dụng ví điện tử, sử dụng tính năng thanh toán qua mã QR, ' +
          'sau đó tải lên mã VNPAYQR có sẵn trong thư viện ảnh và thao tác đồng ý thánh toán trên ứng dụng đó.\n' +
          '\t Điều kiện: Ứng dụng của ngân hàng hoặc ví điện tử có liên kết với VNPAY.\n' +
          '\t Bước 4: Quay trở lại ứng dụng EoH và xác nhận giao dịch và hoàn tất việc thanh toán.\n\n' +
          '\t 2.3. Thẻ ATM và tại khoản ngân hàng\n' +
          '\t Hướng dẫn thực hiện:\n' +
          '\t Bước 1: Sau khi lựa chọn thanh toán trên ứng dụng, ' +
          'quý khách sẽ được chuyển tới cửa sổ để chọn phương thức thanh toán. ' +
          'Tại đây, các cách thanh toán được chấp nhận sẽ hiện thị để khách hàng lựa chọn. ' +
          'Quý khách chọn “Thẻ ATM và tại khoản ngân hàng”\n' +
          '\t Bước 2: Cửa sổ mới mở ra, ' +
          'thông tin về số tiền thanh toán và mã VNPAYQR xuất hiện và danh sách các ngân hàng.\n' +
          '\t Bước 3: Chọn ngân hàng quý khách có tài khoản hoặc thẻ ATM. Rồi chọn nút Tiếp Tục.\n' +
          '\t Bước 4: Màn hình chuyển tới cửa sổ đăng nhập tài khoản ngân hàng của quý khách. ' +
          'Quý khách tiến hành đăng nhập và làm theo hướng dẫn để hoàn thành thanh toán.\n' +
          '\t Bước 5: Quay trở lại ứng dụng EoH và xác nhận giao dịch và hoàn tất việc thanh toán.\n\n' +
          '\t 3. Phương thức thanh toán khác\n' +
          '\t Tại thời điểm hiện tại, chúng tôi chưa thiết lập thêm phương thức thanh toán khác. ' +
          'Chúng tôi sẽ cố gắng tăng trải nghiệm của khách hàng bằng việc hỗ trợ nhiều phương thức thanh toán khác' +
          ' linh hoạt và phù hợp với từng đối tượng khách hàng trong tương lai.\n\n' +
          'Nếu có đề xuất hoặc thắc mắc gì liên quan tới chính sách thanh toán, ' +
          'quý khách vui lòng liên hệ với chúng tôi theo thông tin dưới dây:\n' +
          '\t - Email: info@eoh.io\n' +
          '\t - Số điện thoại hỗ trợ: 028.7100 4747 (trong giờ hành chính).\n\n',
      },
    ],
    []
  );

  const TermsRoute = () => (
    <ScrollView
      style={[scrollViewStyle, styles.container]}
      testID={TESTID.SCROLL_VIEW_TERM_POLICY}
    >
      {data.map((item) => (
        <View key={item.id}>
          <Text style={styles.title} semibold>
            {item.title}
          </Text>
          <Text>{item.content}</Text>
        </View>
      ))}
    </ScrollView>
  );

  const PolicyRoute = () => (
    <ScrollView
      style={[scrollViewStyle, styles.container]}
      testID={TESTID.SCROLL_VIEW_TERM_POLICY}
    >
      {policiesData.map((item) => (
        <View key={item.id}>
          <Text style={styles.title} semibold>
            {item.title}
          </Text>
          <Text>{item.content}</Text>
        </View>
      ))}
    </ScrollView>
  );

  const renderScene = SceneMap({
    first: TermsRoute,
    second: PolicyRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: t('terms_and_condition') },
    { key: 'second', title: t('policies') },
  ]);

  const renderLabel = ({ route, focused, color }) => (
    <Text style={[styles.tabBarLabel, { color }]}>{route.title}</Text>
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={styles.tabBar}
          activeColor={Colors.Gray9}
          inactiveColor={Colors.TextGray}
          indicatorStyle={styles.indicatorStyle}
          renderLabel={renderLabel}
        />
      )}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
});

export default TermAndPolicies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingLeft: 10,
  },
  title: {
    paddingTop: 10,
  },
  tabBar: {
    backgroundColor: Colors.White,
    borderBottomColor: Colors.ShadownTransparent,
    borderBottomWidth: 0.5,
  },
  tabBarLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  indicatorStyle: {
    backgroundColor: Colors.Gray6,
    height: 2,
    marginBottom: -0.5,
  },
});
