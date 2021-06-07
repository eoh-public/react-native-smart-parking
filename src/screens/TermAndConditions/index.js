/* eslint-disable max-len */
import React, { memo, useMemo } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Text from '../../commons/Text';
import { Colors } from '../../configs';

const TermAndConditions = memo(({ scrollViewStyle }) => {
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
        title: '4. Thanh toán',
        content:
          'Khách hàng có thể thanh toán bằng một hoặc phối hợp nhiều phương án như sau: \n' +
          '- Thanh toán bằng tiền mặt cho chủ bãi đỗ xe khi rời bãi;\n' +
          '- Thanh toán bằng phương thức chuyển khoản tiền Việt Nam Đồng và tài khoản của chúng tôi là ' +
          'Thông tin tài khoản:\n' +
          'Chủ tài khoản: CÔNG TY CỔ PHẦN EOH\n' +
          'Số Tài khoản: 2121 1821 92533\n' +
          'Tại: Ngân Hàng TMCP Quân Đội – CN Tân Định – Tp.HCM\n' +
          '- Phương thức thanh toán khác theo thỏa thuận.\n' +
          'Thời gian thanh toán theo thỏa thuận trong hợp đồng.\n' +
          'Hiện nay, chúng tôi chưa cung cấp dịch vụ thanh toán trực tuyến. ' +
          'Tương lai, khi website có chức năng thanh toán trực tuyến, ' +
          'chúng tôi sẽ thiết lập cơ chế để khách hàng sử dụng ' +
          'chức năng này được rà soát và xác nhận thông tin chi tiết ' +
          'về từng giao dịch thanh toán trước khi thực hiện việc thanh toán.',
      },
      {
        id: 5,
        title: '5. Chính sách về hoàn trả',
        content:
          'Khách hàng có thể từ chối đỗ xe khi vị trí đỗ xe không đủ điều kiện để đỗ xe, ' +
          'có khả năng gây hư hỏng xe.\n' +
          'Khách hàng có quyền hủy đặt chỗ đỗ xe trước giờ đặt chỗ tối thiểu 30 phút.',
      },
      {
        id: 6,
        title: '6. Bảo vệ xe tại bãi đỗ',
        content:
          'EoH và chủ bãi đỗ xe có trách nhiệm bảo vệ giữ cho xe ở trạng thái tốt như trước khi vào bãi. ' +
          'Ngoại trừ những yếu tố về tự nhiên, thời tiết như bụi, nắng, mưa ' +
          'thì các hư hỏng mất mát xảy ra trong quá trình đỗ xe ' +
          'sẽ được EoH và Chủ bãi đỗ xe xem xét bổi thường theo yêu cầu phù hợp.',
      },
      {
        id: 7,
        title: '7. Tiêu chuẩn dịch vụ',
        content:
          'EoH luôn mong muốn mang tới cho khách hàng dịch vụ tốt nhất, ' +
          'chúng tôi luôn đặt yêu cầu của khách hàng lên hàng đầu và các tiêu chuẩn dịch vụ ' +
          'hướng tới phải đảm bảo sự hành lòng của khách hàng. ' +
          'Bãi đỗ xe được đề xuất phải ở trong tình trạng đảm bảo an ninh, có người trông coi, ' +
          'có thể ra vào thuận tiện và hạn chế tối đa các tác động từ môi trường.',
      },
      {
        id: 8,
        title: '8. Quy trình cung cấp dịch vụ',
        content:
          'Sau khi quý khách đã đăt chỗ đỗ xe, xe có thể đến bãi theo thời gian đặt trước và sử dụng dich vụ.',
      },
      {
        id: 9,
        title: '9. Quyền, trách nhiệm và nghĩa vụ của EoH',
        content:
          '- Chịu trách nhiệm thông báo Ứng dụng thương mại điện tử bán hàng ' +
          'này tới Bộ Công Thương theo quy định. \n' +
          '- Chịu trách nhiệm cung cấp thông tin đầy đủ, trung thực và không vi phạm pháp luật trên ứng dụng này. \n' +
          '- Có quyền và có trách nhiệm thông báo cho khách hàng về việc thay đổi chính sách, ' +
          'điều khoản, điều kiện giao dịch trên website.\n' +
          '- Chịu trách nhiệm về dịch vụ được cung cấp.',
      },
      {
        id: 10,
        title: '10. Quyền, trách nhiệm, và nghĩa vụ của Khách hàng',
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
        id: 11,
        title: '11. Điều khoản khác',
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

  return (
    <ScrollView style={[scrollViewStyle, styles.container]}>
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
});

export default TermAndConditions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingLeft: 10,
  },
  title: {
    paddingTop: 10,
  },
});
