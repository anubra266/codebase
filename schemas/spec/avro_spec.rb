RSpec.describe NeonSchemas::Avro do
  subject { described_class }

  describe "encode" do
    context "with a valid outbound email message in hash format" do
      let(:schema_name) { "outbound_emails.welcome_email" }
      let(:record) {
        {
          email: "hello@rar"
        }
      }
      let(:encoded) {
        subject.encode(record: record, schema_name: schema_name)
      }

      it "returns Avro formatted binary" do
        expect(encoded).to be_a_kind_of StringIO
        expect(encoded.string).to eq("\u0012hello@rar")
      end
    end

    context "with an invalid outbound email message in hash format" do
      let(:schema_name) { "outbound_emails.welcome_email" }
      let(:record) {
        {
          sub: "rar"
        }
      }
      let(:encoded) {
        subject.encode(record: record, schema_name: schema_name)
      }

      it "returns an Avro::Io::AvroTypeError" do
        expect { encoded }.to raise_error Avro::IO::AvroTypeError
      end
    end
  end

  describe "decode" do
    context "with a valid outbound email message in binary format" do
      let(:schema_name) { "outbound_emails.welcome_email" }
      let(:string) { "\x12hello@rar" }
      let(:decoded) {
        subject.decode(string: string, schema_name: schema_name)
      }

      it "returns a ruby hash" do
        expect(decoded).to be_a_kind_of Hash
        expect(decoded).to eq({
          email: "hello@rar"
        })
      end
    end
  end
end
